// Import the app and environment
import { environment } from './environments/environment.ts';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as bookmarks from './handlers/bookmarks.ts';
import * as courses from './handlers/courses.ts';

// Initialize the web app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Main Route
app.get('/', (_: any, res: any) => {
  res.send("Welcome to the Mercury Public API!");
});

// Get the courses
app.get("/courses", async (req: any, res: any) => courses.getCourses(req, res));

// Get the bookmarks
app.get("/bookmarks", async (req: any, res: any) => bookmarks.getBookmarks(req, res));

// Insert a new bookmark into the database
app.post('/bookmarks', async (req: any, res: any) => bookmarks.insertBookmark(req, res));

// Delete a bookmark from the database
app.delete('/bookmarks', async (req: any, res: any) => bookmarks.deleteBookmark(req, res));

// Start the server
// Command: npm start
const PORT: number = environment.port;
app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`);
});