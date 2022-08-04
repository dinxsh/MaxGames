const express = require("express")
const router = express.Router()
var bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/", (req,res)=>{
    res.render("../../frontend/order/index.html")
})

router.get("/view", (req,res)=>{
  res.render("../../frontend/order/view-order.html")
})

router.post('/', urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);        
    InsertOrder(req.body.name, req.body.number, req.body.date,  req.body.fromaddr, req.body.toaddr)    
});

module.exports = router 