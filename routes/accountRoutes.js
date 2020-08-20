const express = require('express');
const db = require('../data/dbConfig')

const router = express.Router();
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// READ ALL ACCOUNTS
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.get("/", async (req, res, next) => {
    try {
        // select * from accounts
        const accounts = await db.select("*").from("accounts")

        res.json(accounts)
    } catch(err) {
        next(err)
    }
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// READ ACCOUNT BY ID
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.get("/:id", async (req, res, next) => {
    try {
        const [accounts] = await db
        .select("*")
        .from("accounts")
        .where("id", req.params.id)
        .limit(1)

        res.json(accounts)
    } catch (err) {
        next(err)
    }
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// CREATE NEW ACCOUNT
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.post("/", async (req, res, next) => {
    try {
        const [id] = await db
        .insert ({
            name: req.body.name,
            budget: req.body.budget
        })
        .into("accounts")

        const account = await db("accounts")
            // .select("*")
            // .from("accounts")
            .where("id", id)
            // .limit(1)
            .first()  
        res.status(201).json(account)
    } catch (err){
        next(err)
    }
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// UPDATE ACCOUNT
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.put("/:id", async (req, res, next) => {
    try {
        await db("accounts")
        .update({
            name: req.body.name,
            budget: req.body.budget
        })
        .where("id", req.params.id)

        const account = await db("accounts")
            .where("id", req.params.id)
            .first()

            res.status(201)
            .json({"account":"your account has been updated"})
            .json(account)
          
    }catch(err){
        next(err)
    }
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// DELETE ACCOUNT
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.delete("/:id", async (req, res, next) => {
    try {
        await db("accounts")
        .where("id", req.params.id)
        .delete()

        res.status(200).json({account: "your account has been deleted"})
    }catch(err){
        next(err)
    }
})
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.get("/accounts/big", (req, res, next) => {
    try {
        // const [accounts] = await db
        // .select("name")
        // .from("accounts")
        // .where('budget', '>', 100.00)
        res.send("hello");
       
    } catch(err) {
        next(err)
    }
})

 
module.exports = router;