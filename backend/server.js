
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require('dotenv').config()
const app = require('./src/app')
const connectToDB = require('./src/config/database')
connectToDB()

const express = require('express')

app.use(express.static('public'))
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
