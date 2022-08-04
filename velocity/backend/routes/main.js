const express = require("express")
const Router = express()

Router.get("/", (req,res)=>{
    res.render("../frontend/home.html")
})

Router.get("/report", (req,res)=>{
    res.render("../frontend/report.html")
})

module.exports = Router