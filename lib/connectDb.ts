import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI

if(!MONGO_URI){
    throw new Error("Mongo uri is empty, check the env file")
}


declare global{
var _mongoose:{
    conn: typeof mongoose | null;
    promise : Promise<typeof mongoose> | null
    
}
}

let cache = global._mongoose;

if(!cache){
    cache = global._mongoose = {
    conn: null,
    promise: null
}
}


export const connectDB = async ()=>{
    if(cache.conn){
        return cache.conn
    }

    if(!cache.promise){
        cache.promise = mongoose.connect(MONGO_URI)
    }

    cache.conn = await cache.promise
    return cache.conn
}



