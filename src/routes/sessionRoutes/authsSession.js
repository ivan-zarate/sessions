const express = require("express");
const sessionsMongo = express.Router();
const sessionsMongoDAO = require("../../daos/sessions/daoSessionMongo");
const cors = require('cors'); // Par crear usuario en base de datos
// const { checkLogged } = require("../../middlewares/validateAuth");

let user=[];

sessionsMongo.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

sessionsMongo.post("/login", cors(), (req, res) => {
    try {
        const newUser  = req.body;
        const userName = new sessionsMongoDAO(req.body);
        user.push(req.body)
        userName.save();
        if (newUser) {
            req.session.username = newUser;
            console.log(req.session);
            res.status(200).send("Registro exitoso")
        } else {
            res.send({ error: "por favor ingresa el nombre" })
        }
    } catch (error) {
        return res.status(400).send({
            error: `An error occurred ${error.message}`,
        });
    }
});

sessionsMongo.get("/user", async (req, res) => {
    try {
        const username= user[0];
        if (username) {
            res.status(200).send(username)
        } else {
            res.send({ error: "No existe usuario" })
        }
    } catch (error) {
        return res.status(400).send({
            error: `An error occurred ${error.message}`,
        });
    }
});

sessionsMongo.delete("/logout", (req, res) => {
    try {
        user=[];
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