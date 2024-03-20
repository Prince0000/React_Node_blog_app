const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true 
    },
    password: String
});

const AdminModel = mongoose.model("adminData", AdminSchema);

module.exports = AdminModel;
