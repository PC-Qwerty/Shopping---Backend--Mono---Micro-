const express = require('express');
const cors  = require('cors');
const { customer, appevents} = require('./api');
const HandleErrors = require('./utils/error-handler')


module.exports = async (app, channel) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors({
        origin : 'http://localhost:3000'
    }));
    app.use(express.static(__dirname + '/public'))

    //api
    // appevents(app);

    customer(app, channel);
    
    app.use('/' , (req,res) => {
        console.log("Customer Server")
        return res.status(200).json({msg : "Customer Server"});
    })

    // error handling
    app.use(HandleErrors);
    
}