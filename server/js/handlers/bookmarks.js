import mongo from '../lib/mongo.ts';
import app from './app.ts';
// Load the mongo database
mongo.connect();
// Get the bookmarks for a user
app.get('/bookmarks/:userId', async (req, res) => {
    // Get the user id
    const userId = req.params.userId;
    if (userId == null) {
        res.send("Invalid user id.");
        return;
    }
    // Get the bookmarks for the user
    await mongo.getBookmarks(userId).then((data) => {
        res.send(data);
    });
});
// Insert new bookmark into mongodb
app.post('/bookmarks', async (req, res) => {
    // Create the bookmark object
    const bookmark = {
        user_id: req.body.user_id,
        id: req.body.id,
        title: req.body.title,
        name: req.body.name
    };
    // Insert the bookmark into the database
    await mongo.insertBookmark(bookmark).then((data) => {
        res.send(data);
    });
});
// Delete bookmark from mongodb
app.delete('/bookmarks', async (req, res) => {
    // Create the bookmark object
    const bookmark = {
        user_id: req.body.user_id,
        id: req.body.id,
        title: req.body.title,
        name: req.body.name
    };
    // Delete the bookmark from the database
    await mongo.deleteBookmark(bookmark).then((data) => {
        res.send(data);
    });
});
