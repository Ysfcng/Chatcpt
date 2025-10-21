const fs=require("fs")
const path=require("path")
const y=console.log
if(fs.existsSync("notes.txt")){
let text=fs.readFileSync("notes.txt",{encoding:"utf-8"})
y(text)
}
else{
y("dosya bulunamadi")
}


try{
let text=fs.readFileSync("data.txt",{encoding:"utf-8"})
y(text)
}
catch(error){
y("Hata Oluştu dosya okunamadi!")
}
