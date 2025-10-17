const fs=require("fs")
let text=fs.readFileSync("readme.txt",{encoding:"utf-8"})
console.log(text)
