const fs=require("fs")
let data="Node.js Öğreniyorum"
fs.writeFileSync("notes.txt",data)


let text=fs.readFileSync("notes.txt",{encoding:"utf-8"})
let y=console.log
y(text)
