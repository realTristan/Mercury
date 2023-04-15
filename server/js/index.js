"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo = require('./mongo.ts');
// Initialize the web app
const app = express();
app.use(bodyParser.json());
app.use(cors());
// Main Route
app.get('/', (req, res) => {
    res.send("Welcome to the Mercury Public API!");
});
// Get the bookmarks for a user
app.get('/bookmarks/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the user id
    const userId = req.params.userId;
    if (userId == null) {
        res.send("Invalid user id.");
        return;
    }
    // Get the bookmarks for the user
    yield mongo.getBookmarks(userId).then((data) => {
        res.send(data);
    });
}));
// Insert new bookmark into mongodb
app.post('/bookmarks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Create the bookmark object
    const bookmark = {
        user_id: req.body.user_id,
        id: req.body.id,
        title: req.body.title,
        name: req.body.name
    };
    // Insert the bookmark into the database
    yield mongo.insertBookmark(bookmark).then((data) => {
        res.send(data);
    });
}));
// Delete bookmark from mongodb
app.delete('/bookmarks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Create the bookmark object
    const bookmark = {
        user_id: req.body.user_id,
        id: req.body.id,
        title: req.body.title,
        name: req.body.name
    };
    // Delete the bookmark from the database
    yield mongo.deleteBookmark(bookmark).then((data) => {
        res.send(data);
    });
}));
// Start the server
// Command: npm start
app.listen(8000, () => {
    console.log('Listening on: http://localhost:8000');
});
