const mongoose = require('mongoose');
//Load environment variables
require('dotenv').config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected succesfully');
    } catch(err) {
        console.error('MongoDB connection failed: ', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;