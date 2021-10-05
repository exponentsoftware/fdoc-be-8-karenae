const print = async (str,interval)=>{
    setTimeout(()=>{
        console.log(str)
    },interval);
}

print("A",1000);
print("B",2000);
print("C",3000);