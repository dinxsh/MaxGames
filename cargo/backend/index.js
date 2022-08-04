const express = require("express")
const path = require("path")
const app = express()

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// routes
const MainRouter = require("../backend/routes/main")
const OrderRouter = require("../backend/routes/order")

app.use("/", MainRouter)
app.use("/order", OrderRouter)

app.use(express.static(path.join(__dirname)));
app.use(express.static('../frontend/'));

app.listen(5000, ()=> console.log("Server Started"))