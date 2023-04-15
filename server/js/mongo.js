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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookmark = exports.insertBookmark = exports.getBookmarks = exports.bookmarkExists = void 0;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: '/server/.env' });
// Get the mongodb password from the environment variables
const getMongoPassword = () => {
    var pass = "8Ii5dsN0O5MpYL1P"; // process.env.MONGO_PASSWORD;
    if (pass == undefined) {
        return "";
    }
    return encodeURIComponent(pass);
};
// Mongodb URI and Client
const MONGODB_URI = `mongodb+srv://heytristaann:${getMongoPassword()}@mercury.cxmdirb.mongodb.net/?retryWrites=true&w=majority`;
const CLIENT = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Connect to the MongoDB cluster
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect to the MongoDB cluster
        try {
            // Connect to the MongoDB cluster
            yield CLIENT.connect();
            // Connect to the database and ping it
            yield CLIENT.db("mercury").command({ ping: 1 });
            // Print success
            console.log("Successfully connected to the MongoDB Mercury database.");
        }
        // Catch the error
        catch (err) {
            console.log(err);
        }
    });
}
// Check if a bookmark already exists
function bookmarkExists(bookmark) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the collection
        let coll = CLIENT.db("mercury").collection("bookmarks");
        // Check if the bookmark exists
        try {
            // Get the bookmark
            let data = yield coll.findOne(bookmark);
            // Verify that the data is not null
            if (data == null || data.toArray().length == 0) {
                return false;
            }
            return true;
        }
        // Catch the error
        catch (err) {
            console.log(err);
        }
        // Return false
        return false;
    });
}
exports.bookmarkExists = bookmarkExists;
// Get the bookmarks for a user
function getBookmarks(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the collection
        let coll = CLIENT.db("mercury").collection("bookmarks");
        // Get the bookmarks for the user
        try {
            // Get the bookmarks for the user
            let data = yield coll.find({ user_id: userId });
            // Verify that the data is not null
            if (data == null) {
                return [];
            }
            // Return the data
            return data.toArray();
        }
        // Catch the error
        catch (err) {
            console.log(err);
        }
        // Return null
        return [];
    });
}
exports.getBookmarks = getBookmarks;
// Insert a new bookmark into the database
function insertBookmark(bookmark) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield bookmarkExists(bookmark)) {
            return {};
        }
        // Get the collection
        let coll = CLIENT.db("mercury").collection("bookmarks");
        // Insert the bookmark into the database
        try {
            return yield coll.insertOne(bookmark);
        }
        // Catch the error
        catch (err) {
            console.log(err);
        }
        // Return the result
        return {};
    });
}
exports.insertBookmark = insertBookmark;
// Delete a bookmark from the database
function deleteBookmark(bookmark) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the collection
        let coll = CLIENT.db("mercury").collection("bookmarks");
        // Delete the bookmark from the database
        try {
            return yield coll.deleteOne(bookmark);
        }
        // Catch the error
        catch (err) {
            console.log(err);
        }
        // Return null
        return {};
    });
}
exports.deleteBookmark = deleteBookmark;
