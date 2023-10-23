function saveToDB(){
    return new Promise((resolve,reject)=>{
        // console.log(resolve);
        // console.log(reject);
        let success = Math.floor(Math.random()*100);
        if (success<50){
            resolve("success");
        }else{
            reject("failure");
        }
    })
}


saveToDB()
    .then((result) => {
        console.log(result);
        // console.log("this was a success");
        return saveToDB();
    })
    .then((result)=>{
        console.log(result);
        // console.log("this was a success2");
        return saveToDB();
    })
    .then((result)=>{
        console.log(result);
        // console.log("this was a success3");
    })
    .catch((err) => {
        console.log("this was a failure");
    })
