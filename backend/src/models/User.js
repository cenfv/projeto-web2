const mongoose = require('mongoose');
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: [true, 'Por favor digite um nome'],
    },
    lastName : {
        type: String,
        required: [true, 'Por favor digite um último nome'],
    },
    email : {
        type: String,
        required: [true, 'Por favor digite um email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Por favor insira um email válido']
    },
    password : {
        type: String,
        required: [true, 'Por favor digite uma senha'],
        minlength: [16, 'Mínimo de 6 caracteres']
    },
    gender : {
        type: String,
        required: [true, 'Por favor selecione uma opção de gênero']
    },
});

module.exports = mongoose.model("User",userSchema);