function equalArrays(arr1, arr2){
    let sum = 0
    if(arr1.toString() === arr2.toString()){
        for(let number of arr1){
            number = Number(number)
            sum+=number
        }
        console.log(`Arrays are identical. Sum: ${sum}`);
    }
    else{
   for(let i = 0; i<arr1.length; i++){
       
           if(arr1[i]!==arr2[i]){
               console.log(`Arrays are not identical. Found difference at ${i} index`);break
           }
       }
       
   }

}
//equalArrays(['10','20','30'], ['10','20','30'])
equalArrays(['1','2','3','4','5'], ['1','2','4','4','5'])