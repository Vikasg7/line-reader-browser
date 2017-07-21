"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
document.querySelector("input").onchange = () => {
    const input = document.querySelector("input");
    if (!input.files.length)
        return;
    const lr = new index_1.LineReader(input.files[0], 4 * 1024);
    lr.forEachLine((line, i) => console.log(i, line)).then(() => console.log("Done!"));
};
//# sourceMappingURL=test.js.map