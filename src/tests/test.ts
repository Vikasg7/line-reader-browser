import { LineReader } from "../index"

(<HTMLInputElement>document.querySelector("input.fullFile")).onchange = () => {
   console.log("fullFile")
   const input = <HTMLInputElement>document.querySelector("input.fullFile")
   if (!input.files.length) return
   const lr = new LineReader(input.files[0], 4 * 1024)
   lr.forEachLine((line: string, i) => console.log(i, line)).then(() => console.log("Done!"))
}

(<HTMLInputElement>document.querySelector("input.someLines")).onchange = () => {
   console.log("someLines")
   const input = <HTMLInputElement>document.querySelector("input.someLines")
   if (!input.files.length) return
   const lr = new LineReader(input.files[0], 4 * 1024)
   lr.forEachLine((line: string, i) => (i === 10 ? false : console.log(i, line))).then(() => console.log("Done!"))
}