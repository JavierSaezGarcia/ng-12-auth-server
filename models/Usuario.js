const { Schema, model } = require("mongoose");


const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Para exportar fuera el modelo es un poco diferente ya que model() viene de mongoose
module.exports = model('Usuario', UsuarioSchema);