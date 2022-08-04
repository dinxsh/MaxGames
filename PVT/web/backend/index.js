const express = require("express")
const path = require("path")
const app = express()

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, "../frontend/")));

// routes
const MainRouter = require("../backend/routes/main")
app.use("/", MainRouter)
const OrderRouter = require("../backend/routes/order")
app.use("/", OrderRouter)

app.listen(8080, ()=> console.log("server started"))