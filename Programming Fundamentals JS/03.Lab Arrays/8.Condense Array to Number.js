function condenseArrayToNumber(arr) {
   
    while (arr.length > 1) {
        let condensed = [];
        for (let i = 0; i < arr.length - 1; i++) {
            let num1 = arr[i];
            let num2 = arr[i + 1];
            let sum = num1 + num2;
            condensed.push(sum)
        }
        arr=condensed
       
    }
    console.log(arr[0]);
}
condenseArrayToNumber([2, 10, 3])
condenseArrayToNumber([5, 0, 4, 1, 2])
condenseArrayToNumber([1])