import mongoose from 'mongoose' 

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://alvaroym21:rRGn9U768bIw8rVX@cluster0.dftplwi.mongodb.net/Parcial3')
        console.log("Conexión establecida")        
    } catch (error) {
        console.log(error)
    }
};

