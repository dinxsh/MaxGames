const express = require("express")
const path = require("path")
const app = express()

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, "../frontend/")));

const MainRouter = require("../backend/routes/main")
app.use("/", MainRouter)
const GameRouter = require("../backend/routes/game")
app.use("/game", GameRouter)

app.listen(8080, ()=> console.log("server started"))