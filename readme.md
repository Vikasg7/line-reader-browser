# line-reader-browser

- ### Intro  
   **line-reader-browser** allows browsers to read an input file line by line from source without reading whole file at once. I will recommend using nodejs and browserify to use this module.

- ### Install  
   `npm install git+https://github.com/Vikasg7/line-reader-browser.git`  

- ### Syntax
   ````javascript  
   import { LineReader } from "line-reader-browser"
   
   // file is javascript File Object returned from input element
   // chunkSize(optional) is number of bytes to be read at one time from file. defaults to 8 * 1024
   const file: File
   const chunSize: number
   const lr = new LineReader(file, chunkSize)

   // context is optional. It can be used to inside processLineFn   
   const context = {}
   lr.forEachLine(processLineFn, context)
     .then((context) => console.log("Done!", context))

   // context is same Object as passed while calling forEachLine
   function processLineFn(line: string, index: number, context: any) {
      console.log(index, line)
   }

   ````  

- ### Usage (in TypeScript)  
   ````javascript  
   import { LineReader } from "line-reader-browser"

   document.querySelector("input").onchange = () => {
      const input = document.querySelector("input")
      if (!input.files.length) return
      const lr = new LineReader(input.files[0], 4 * 1024)
      lr.forEachLine((line: string, i) => console.log(i, line)).then(() => console.log("Done!"))
   }
   ````

- ### Example
   I have added test.html which refers to the bundle.js in the dist/tests/ folder. Open test.html in the browser, choose the input file and see lines logging in the console.