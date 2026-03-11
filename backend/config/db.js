const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000, 
            socketTimeoutMS: 45000,        
            family: 4                 
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📂 Database Name: ${conn.connection.name}`);

    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        
        if (error.message.includes('timeout')) {
            console.log("🔄 Timeout error! Please check your Internet or MongoDB IP Whitelist.");
        }
        
        process.exit(1); 
    }
};

module.exports = connectDB;