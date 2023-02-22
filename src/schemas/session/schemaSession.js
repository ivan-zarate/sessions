const mongoose = require("mongoose");

const schemaSessionOnMongo = new mongoose.Schema(
    {
        username: { type: String, required: true },
    }, {
    timestamps: true
}
)

module.exports= schemaSessionOnMongo