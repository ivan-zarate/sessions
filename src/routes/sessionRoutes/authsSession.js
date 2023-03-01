const express = require("express");
const sessionsMongo = express.Router();
const sessionsMongoDAO = require("../../daos/sessions/daoSessionMongo"); // Par crear usuario en base de datos
// const { checkLogged } = require("../../middlewares/validateAuth");

sessionsMongo.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

sessionsMongo.post("/login", async(req, res) => {
    try {
        const { newUser } = req.body;
        const userName = new sessionsMongoDAO(req.body);
        userName.save();
        if (newUser) {
            req.session.username = newUser;
            res.status(200).send(req.session.newUser)
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
        const username= await sessionsMongoDAO.find();
        console.log(username);
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