import "thenForEach"

export class LineReader {
   private _lastLine: string
   private _bytesRead: number
   private _lineNum: number
   private _continue: any

   constructor(private _file: File, private _chunkSize = 8 * 1024) {
      this._lastLine = ''
      this._bytesRead = 0
      this._lineNum = -1
   }

   private _readFile(file: Blob): Promise<ArrayBuffer> {
      return new Promise<ArrayBuffer>((resolve, reject) => {
         const reader = new FileReader()
         reader.onload = () => resolve(reader.result)
         reader.onerror = (error: any) => reject(error)
         reader.readAsArrayBuffer(file)
      })
   }

   private _arrBuf2String(buf: ArrayBuffer) {
      return String.fromCharCode.apply(null, new Uint8Array(buf));
   }

   private _buf2Lines(buf: ArrayBuffer): Array<string> {
      this._bytesRead += buf.byteLength
      const lines = [this._lastLine, this._arrBuf2String(buf)].join("").split(/\r?\n|\r(?!\n)/)
      this._lastLine = lines.pop()
      return lines
   }

   private _cleanUp() {
      this._file = null
      this._chunkSize = null
      this._lastLine = null
      this._bytesRead = null
      this._lineNum = null
      this._continue = null
      return Promise.resolve() // this will help in chaining promises
   }

   public forEachLine(fn: (line?: string, index?: number, context?: any) => void, context?: any): Promise<any> {
      if (this._bytesRead >= this._file.size) { // No more content in the file
         if (!this._lastLine) return Promise.resolve(context)
         return Promise.resolve(this._lastLine)
            .then((line) => fn(line, this._lineNum += 1, context))
            .then(() => this._cleanUp())
            .then(() => context)
      } else { // File still have some content to read
         const b = this._file.slice(this._bytesRead, this._bytesRead + this._chunkSize)
         return this._readFile(b)
            .then((buf: ArrayBuffer) => this._buf2Lines(buf))
            .thenForEach<string>((line) => this._continue = fn(line, this._lineNum += 1, context))
            .then(() => this._continue === false ? this._cleanUp().then(() => context) : this.forEachLine(fn, context))
      }
   }
}