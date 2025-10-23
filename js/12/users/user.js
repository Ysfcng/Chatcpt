const express=require("express")
const router=express.Router()
const y=console.log

let  users=[{name:"ahmet",email:"ahmet@gmail.com"},{name:"ali",email:"ali@gmail.com"}]

/*listeleme*/
router.get("/",(req,res)=>{
res.json(users)
})

/*kullanici ekleme*/
router.post("/",(req,res)=>{
const name=req.body.name
const email=req.body.email

if(!validate(name,email))
return res.json({message:"hatali email"})

users.push({name:name,email:email})
res.json({message:`${name} kullanicisi eklendi`})
})


/*kullanici silme*/
router.delete("/",(req,res)=>{
y("enetered")
let {name}=req.body
if(name.trim()==""||!name){
return res.json({error:"kullanici ismi girmediniz"})
}
y("gecti")
if(users.findIndex(x=>x["name"]==name)<0)
return res.json({error:"kullanici bulunamadi"})
users=users.filter(x=>x["name"]!=name)
return res.json({message:`${name} kullanicisi silindi`})

})

/*kullanici guncelleme*/
router.put("/",(req,res)=>{
y("gecti")
let {name}=req.body
let {email}=req.body
y("gecti")

if(!validate(name,email)){
return res.json({error:"hatali isim veya email"})
}

y("gecti")
let index=users.findIndex(x=>x["name"]==name)

if(index<0){
return res.json({error:"kullanici bulunamadi"})
}
users[index]["email"]=email
return res.json({message:"kullanici guncellendi"})
})


function validate(name,email){
if(name.trim()=="")
return false

if([1,2,3,4,5,6,7,8,9,0].some(x=>name.includes(x)))
return  false



let regex = /^\S+@\S+\.\S+$/;

let mail = "test@example.com";
if (regex.test(mail)) {
    y("Valid Email address");
    return true

} else {
    y("Invalid Email address");
return false
}

}

module.exports=router
