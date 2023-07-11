import { get } from 'http';
import * as mongo from '../lib/mongo.ts';

// Async function to get the bookmarks for a user
export async function getBookmarks(req: any, res: any): Promise<void> {
  // Get the user id
  const userId = req.params.userId;
  if (userId == null) {
    res.send("Invalid user id.");
    return;
  }

  // Get the bookmarks for the user
  await mongo.getBookmarks(userId).then((data: any) => {
    res.send(data);
  });
}

// Async function to insert a new bookmark into the database
export async function insertBookmark(req: any, res: any): Promise<void> {
  // Create the bookmark object
  const bookmark = {
    user_id: req.body.user_id,
    id: req.body.id,
    title: req.body.title,
    name: req.body.name
  };

  // Insert the bookmark into the database
  await mongo.insertBookmark(bookmark).then((data: any) => {
    res.send(data);
  });
}

// Delete bookmark from mongodb
export async function deleteBookmark(req: any, res: any): Promise<void> {
  // Create the bookmark object
  const bookmark = {
    user_id: req.body.user_id,
    id: req.body.id,
    title: req.body.title,
    name: req.body.name
  };

  // Delete the bookmark from the database
  await mongo.deleteBookmark(bookmark).then((data: any) => {
    res.send(data);
  });
}
