const y=console.log
const fs=require("fs").promises
async function readFileSync(){
try{
await fs.writeFile("notes.txt","Asenkron node.js harika")
const text =await fs.readFile("notes.txt",{encoding:"utf-8"})
y(text)
}catch(e){
y(e)
}

}
readFileSync()
