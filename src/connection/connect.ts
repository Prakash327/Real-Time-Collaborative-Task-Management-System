import dotenv from 'dotenv'
import  Mongoose from 'mongoose';
dotenv.config()
async function connectToDatabase() {
  try {
    const dbUri = process.env.MONGODB_URI ;
    if(!dbUri){
        throw new Error("Mongo is not defined in .env")
    }
    await Mongoose.connect(dbUri)
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}
export default connectToDatabase;
