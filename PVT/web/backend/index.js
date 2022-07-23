const express = require("express")
const app = express()

app.run(8080, ()=> console.log("server started"))