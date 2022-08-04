const express = require("express")
const router = express.Router()

router.get("/", (req,res)=>{
    res.render("../frontend/index.html")
})

router.get("/about", (req,res)=>{
    res.render("../../frontend/about.html")
})

router.get("/contact", (req,res)=>{
    res.render("../../frontend/contact.html")
})

router.get("/price", (req,res)=>{
    res.render("../../frontend/price.html")
})

router.get("/service", (req,res)=>{
    res.render("../../frontend/service.html")
})

router.get("/register", (req,res)=>{
    res.render("../../frontend/register.html")
})

router.get("/blog", (req,res)=>{
    res.render("../../frontend/blog.html")
})

router.get("/single", (req,res)=>{
    res.render("../../frontend/single.html")
})

module.exports = router