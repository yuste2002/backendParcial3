import mongoose from 'mongoose'

const eventoSchema = mongoose.Schema({
    nombre : {
        type : String,
        required : true 
    },
    timestamp : {
        type : Date,
        required : true 
    },
    lugar : {
        type : String
    },
    lat : {
        type : Number,
        required : true
    },
    lon : {
        type : Number,
        required : true 
    },
    organizador : {
        type : String,
        required : true
    },
    imagen : {
        type : String,
        default: "http://res.cloudinary.com/dten77l85/image/upload/v1701645989/hfxempzbqlkawdekvuxy.jpg"
    }
}, { versionKey: false });

export default mongoose.model('eventos', eventoSchema)