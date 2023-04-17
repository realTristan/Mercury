import app from "./app.ts";
import { createClient, SchemaFieldTypes } from "redis";
// Initialize the rediseach client
const client = createClient();
await client.connect();
// Initialize the courses index
await client.ft.create("idx:courses", {
    title: SchemaFieldTypes.TEXT,
    description: SchemaFieldTypes.TEXT,
    pre_requisites: SchemaFieldTypes.TEXT,
    name: SchemaFieldTypes.TEXT,
}, {
    ON: "HASH",
    // PREFIX: "noderedis:courses",
});
// Get the bookmarks for a user
app.get("/courses", async (req, res) => {
    // Get the limit from the query parameters
    let limit = req.query.limit;
    if (limit == null) {
        limit = 100;
    }
    // Get the query from the query parameters
    const query = req.query.q;
    if (query == null) {
        res.send("{}");
        return;
    }
    // Get the courses from the database using redisearch
    const results = await client.ft.search('idx:animals', query, {
        LIMIT: {
            from: 0,
            size: limit
        }
    });
    // Send the results
    res.send(results);
});
