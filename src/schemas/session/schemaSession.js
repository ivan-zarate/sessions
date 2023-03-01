const mongoose = require("mongoose");

const schemaSessionOnMongo = new mongoose.Schema(
    {
        userName: { type: String, required: true },
    }, {
    timestamps: true
}
)

module.exports= schemaSessionOnMongo