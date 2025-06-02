import mongoose from 'mongoose';

async function connect(url) {

    console.log(url);

    if (!url) {
        throw new Error("MongoDB connection string URL is required");
    }
    mongoose.set('strictQuery', true);

    await mongoose.connect(url);
    console.log("Database connected");
}

export default connect;
