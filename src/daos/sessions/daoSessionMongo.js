const schemaSessionOnMongo= require("../../schemas/session/schemaSession");
const mongoose = require("mongoose");

const sessionsMongoDAO=mongoose.model('users', schemaSessionOnMongo);

module.exports=sessionsMongoDAO