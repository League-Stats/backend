require('dotenv').config();

const express = require("express");
const server = require('./server');

const port = process.env.PORT || 4000

server.listen(port, function() {
    console.log(`\n Server running on PORT ${port}`)
});