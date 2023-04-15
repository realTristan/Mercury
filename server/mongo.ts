const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: '/server/.env' })

// Get the mongodb password from the environment variables
const getMongoPassword = () => {
  var pass: string | undefined = "8Ii5dsN0O5MpYL1P"; // process.env.MONGO_PASSWORD;
  if (pass == undefined) {
    return "";
  }
  return encodeURIComponent(pass);
}

// Mongodb URI and Client
const MONGODB_URI: string = `mongodb+srv://heytristaann:${getMongoPassword()}@mercury.cxmdirb.mongodb.net/?retryWrites=true&w=majority`;
const CLIENT: any = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
);

// Connect to the MongoDB cluster
async function connect(): Promise<void> {
  // Connect to the MongoDB cluster
  try {
    // Connect to the MongoDB cluster
    await CLIENT.connect();

    // Connect to the database and ping it
    await CLIENT.db("mercury").command({ ping: 1 });

    // Print success
    console.log("Successfully connected to the MongoDB Mercury database.");
  } 
  // Catch the error
  catch (err) {
    console.log(err);
  }
}

// Check if a bookmark already exists
export async function bookmarkExists(bookmark: any): Promise<boolean> {
  // Get the collection
  let coll: any = CLIENT.db("mercury").collection("bookmarks");

  // Check if the bookmark exists
  try {
    // Get the bookmark
    let data: any = await coll.findOne(bookmark);

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
}

// Get the bookmarks for a user
export async function getBookmarks(userId: string): Promise<any[]> {
  // Get the collection
  let coll: any = CLIENT.db("mercury").collection("bookmarks");

  // Get the bookmarks for the user
  try {
    // Get the bookmarks for the user
    let data: any = await coll.find({ user_id: userId })

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
  return []
}

// Insert a new bookmark into the database
export async function insertBookmark(bookmark: any): Promise<any> {
  if (await bookmarkExists(bookmark)) {
    return {};
  }

  // Get the collection
  let coll: any = CLIENT.db("mercury").collection("bookmarks");

  // Insert the bookmark into the database
  try {
    return await coll.insertOne(bookmark);
  }
  // Catch the error
  catch (err) {
    console.log(err);
  }

  // Return the result
  return {};
}

// Delete a bookmark from the database
export async function deleteBookmark(bookmark: any): Promise<any> {
  // Get the collection
  let coll: any = CLIENT.db("mercury").collection("bookmarks");

  // Delete the bookmark from the database
  try {
    return await coll.deleteOne(bookmark);
  }
  // Catch the error
  catch (err) {
    console.log(err);
  }

  // Return null
  return {};
}