import "thenForEach";
export declare class LineReader {
    private _file;
    private _chunkSize;
    private _lastLine;
    private _bytesRead;
    private _lineNum;
    private _continue;
    constructor(_file: File, _chunkSize?: number);
    private _readFile(file);
    private _arrBuf2String(buf);
    private _buf2Lines(buf);
    private _cleanUp();
    forEachLine(fn: (line?: string, index?: number, context?: any) => void, context?: any): Promise<any>;
}
