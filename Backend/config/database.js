const mongoose = require('mongoose');
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/SGA');
            console.log('Conexión a la base de datos establecida');
    
    } catch (error) {
        console.error( error);
    }
}
module.exports = connectDB; 
