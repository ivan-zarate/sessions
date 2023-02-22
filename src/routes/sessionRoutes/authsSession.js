const express = require("express");
const sessionsMongo = express.Router();
const sessionsMongoDAO = require("../../daos/sessions/daoSessionMongo")
const { checkLogged } = require("../../middlewares/validateAuth");

sessionsMongo.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

sessionsMongo.post("/login", (req, res) => {
    try {
        const {username} = req.body;

    if(username){
        req.session.username=username;
        console.log(req.session);
        //const newUser = new sessionsMongoDAO(req.body);
        //newUser.save();
        res.send(req.session)
    } else{
        res.send({error:"por favor ingresa el nombre"})
    }
    } catch (error) {
        return res.status(400).send({
            error: `An error occurred ${error.message}`,
        });
    }
});

sessionsMongo.get("/logout", (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                res.redirect("/")
            } else {
                res.send("logout")
            }
        })
    } catch (error) {
        return res.status(400).send({
            error: `An error occurred ${error.message}`,
        });
    }
});

module.exports = sessionsMongo