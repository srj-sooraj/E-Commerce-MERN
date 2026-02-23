import mongoose from 'mongoose';

export default async function connection(){
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
        console.log('database connected');
        return db;
    } catch (error) {
        console.log(error, 'database connection error');
    }
}
