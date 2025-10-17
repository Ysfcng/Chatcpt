function filterOdds(array){
return array.filter(x=>x%2)

}
function sumArray(array){
return array.reduce((x,y)=>x+y)

}
console.log(filterOdds([1,2,3,4,5]))
console.log(sumArray([1,2,3,4,5]))
