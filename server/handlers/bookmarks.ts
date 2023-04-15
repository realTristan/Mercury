import mongo from '../lib/mongo';
import app from './app';

// Get the bookmarks for a user
app.get('/bookmarks/:userId', async (req: any, res: any) => {
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
});
  
// Insert new bookmark into mongodb
app.post('/bookmarks', async (req: any, res: any) => {
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
});

// Delete bookmark from mongodb
app.delete('/bookmarks', async (req: any, res: any) => {
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
});