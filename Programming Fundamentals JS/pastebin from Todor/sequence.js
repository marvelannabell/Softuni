function sequences(input){
    let result = [];
 
    for(let row of input){
        let arr = JSON.parse(row)
        arr = arr.sort((a,b)=> b - a)
        let arrAsString = JSON.stringify(arr)
        if (!result.includes(arrAsString)) {
            result.push(arrAsString)
        }
    }
    let res = result
        .map(x=> JSON.parse(x))
        .sort((a,b) => a.length - b.length)
        .forEach(x => {
            let formattedText = `[${x.join(", ")}]`
            console.log(formattedText)
        })
    // for(let row of res){
    //     console.log(row, row.length)
    //     // let formattedText = `[${row.join(", ")}]`
    //     // console.log(formattedText)
    // }
}