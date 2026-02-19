import { connect } from "mongoose"

const mongodb_Uri= process.env.MONGODB_URI
if(!mongodb_Uri){
    throw new Error("mongodb uri is not found.")
}

let cached=global.mongoose

if(!cached){
   cached= global.mongoose={conn:null, promise:null}
}

const connectDb= async ()=>{
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        cached.promise= connect(mongodb_Uri).then((c)=>c.connection)
    }

    try{
      cached.conn= await cached.promise
    }catch(error){
        throw error
    }

    return cached.conn
}

export default connectDb