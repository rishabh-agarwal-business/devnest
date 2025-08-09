import { MongooseCache } from '@/types/global';
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URI as string;

if (!MONGODB_URL) throw new Error('MONGODB_URL is not defined');

declare global {
    var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}

const dbConnect = async (): Promise<Mongoose> => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URL, {
                dbName: 'DevNext'
            })
            .then((result) => {
                console.log('Connected to MongoDB');
                return result;
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB', error);
                throw error;
            });
    }

    cached.conn = await cached.promise;

    return cached.conn;
}

export default dbConnect;