

const mongoose = require('mongoose');

// conexion BD 
const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true
        });
 
        console.log('DB Online');
 
    }
    catch (error){
        console.log(error);
        throw new Error('Error a la hora de inicializar la DB');
    }    
 
}
module.exports = {
    dbConnection
}

