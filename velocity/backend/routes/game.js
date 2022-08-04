const express = require("express")
const Router = express()

Router.get("/", (req,res)=>{
    res.render("../frontend/")
})

Router.get("/status", (req,res)=>{
    res.json({status:"400"})    
    // status check and response in json
})

module.exports = Router