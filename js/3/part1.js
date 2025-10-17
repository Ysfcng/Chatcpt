function avarage(array){
return array.reduce((x,y)=>x+y)/array.length

}
console.log(avarage([10,20,30,40]))
function processNumbers(array,callback){
return array.map(x=>callback(x))

}
console.log(processNumbers([1, 2, 3], x => x * 2) )
