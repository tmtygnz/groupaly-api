export const norm = (x:string)=>{
  console.log(x);
}

export const green = (x:string)=>{
  console.log("\x1b[32m%s\x1b[0m", x);
}

export const yellow = (x:string)=>{
  console.log("\x1b[33m%s\x1b[0m",x);
}

export const red = (x:string)=>{
  console.log("\x1b[31m%s\x1b[0m",x);
}