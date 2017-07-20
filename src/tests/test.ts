import { LineReader } from "../index"

document.querySelector("input").onchange = () => {
   const input = document.querySelector("input")
   if (!input.files.length) return
   const lr = new LineReader(input.files[0], 4 * 1024)
   lr.forEachLine((line: string, i) => console.log(i, line)).then(() => console.log("Done!"))
}