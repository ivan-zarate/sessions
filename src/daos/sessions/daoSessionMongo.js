const schemaSessionOnMongo= require("../../schemas/session/schemaSession");
const mongoose = require("mongoose");

const sessionsMongoDAO=mongoose.model('sessions', schemaSessionOnMongo);

module.exports=sessionsMongoDAO