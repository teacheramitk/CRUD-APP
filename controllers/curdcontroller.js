const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk')

AWS.config.update(
    {
    "region": process.env.AWS_REGION,
    "endpoint": process.env.ENDPOINT,
    "accessKeyId": process.env.ACCESS_KEY, 
    "secretAccessKey": process.env.SECRET_KEY
    }
)

const dynamodb = new AWS.DynamoDB()
const docClient = new AWS.DynamoDB.DocumentClient

router.post("/createTable", function(req,res) {

    console.log("createTable called");
    console.log(req.body);
    var params = req.body;
    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            res.send(JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
            res.send(JSON.stringify(data, null, 2));
        }
    });
});

router.post("/insertData", function (req,res) {
    console.log("insertData called");
    console.log(req.body);
    var params = req.body;
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            res.send(JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            // res.send("New item added successfully");
            res.send(JSON.stringify("New item added successfully"));
        }
    });
});

router.post("/updateData", function(req,res) {
    console.log("updateData called");
    console.log(req.body);
    var params = req.body;
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            res.send(JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            res.send(JSON.stringify(data, null, 2));
        }
    });
});

router.post("/readData", function(req,res) {
    console.log("readAllData called");
    console.log(req.body);
    var params = req.body;
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            res.send(JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            res.send(JSON.stringify(data, null, 2));
        }
    });
});

router.post("/deleteItem", function(req,res) {
    console.log("deleteData called");
    console.log(req.body);
    var params = req.body;
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            res.send(JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            res.send("Item deleted successfully");
        }
    });
});

router.post("/deleteTable", function(req,res) {
    console.log("deleteTable called");
    console.log(req.body);
    var params = req.body;
    dynamodb.deleteTable(params, function(err, data) {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
            res.send(JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
            res.send(JSON.stringify(data, null, 2));
        }
    });
    
});

module.exports = router;
