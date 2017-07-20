# line-reader-browser

- ### Intro  
   **line-reader-browser** allows browsers to read an input file line by line from source without reading whole file at once. I will recommend using nodejs and browserify to use this module.

- ### Install  
   `npm install git+https://github.com/Vikasg7/line-reader-browser.git`  

- ### Syntax
   ````javascript  
   import { LineReader } from "line-reader-browser"
   
   // file is javascript File Object returned from input element
   // context is optional. It can be used to inside processLineFn 
   const lr = new LineReader(file: File, context = {})
   
   lr.forEachLine(processLineFn)
     .then((context) => console.log("Done!", context))

   // context is same as passed while calling LineReader
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