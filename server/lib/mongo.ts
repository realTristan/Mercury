import { MongoClient } from 'mongodb';
import { environment } from '../environments/environment.ts';

// Mongodb URI and Client
const PASSWORD = encodeURIComponent(environment.mongo_password);
const MONGODB_URI: string = `mongodb+srv://heytristaann:${PASSWORD}@mercury.cxmdirb.mongodb.net/?retryWrites=true&w=majority`;
const CLIENT: any = new MongoClient(MONGODB_URI);

// Load the mongo database
connect();

// Get the bookmarks collection
const BOOKMARKS: any = CLIENT.db("mercury").collection("bookmarks");

// Connect to the MongoDB cluster
async function connect(): Promise<void> {
  // Connect to the MongoDB cluster
  try {
    // Connect to the MongoDB cluster
    await CLIENT.connect();

    // Connect to the database and ping it
    await CLIENT.db("mercury").command({ ping: 1 });

    // Print success
    console.log("Successfully connected to the MongoDB Mercury cluster.");
  } 
  // Catch the error
  catch (err) {
    console.log(err);
  }
}

// Check if a bookmark already exists
export async function bookmarkExists(bookmark: any): Promise<boolean> {
  // Check if the bookmark exists
  try {
    let data: any = await BOOKMARKS.findOne(bookmark);

    // Verify that the data is not null
    if (data.toArray().length == 0) {
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
  // Get the bookmarks for the user
  try {
    let data: any = await BOOKMARKS.find({ user_id: userId })

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

  // Insert the bookmark into the database
  try {
    return await BOOKMARKS.insertOne(bookmark);
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
  // Delete the bookmark from the database
  try {
    return await BOOKMARKS.deleteOne(bookmark);
  }
  // Catch the error
  catch (err) {
    console.log(err);
  }

  // Return null
  return {};
}

// Default export the client variable
export default CLIENT;