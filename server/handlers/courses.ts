import app from "./app";
import { createClient, SchemaFieldTypes } from "redis";

// Initialize the rediseach client
const client: any = createClient();
await client.connect();

// Initialize the courses index
await client.ft.create(
  "idx:courses",
  {
    title: SchemaFieldTypes.TEXT,
    description: SchemaFieldTypes.TEXT,
    pre_requisites: SchemaFieldTypes.TEXT,
    name: SchemaFieldTypes.TEXT,
  },
  {
    ON: "HASH",
    // PREFIX: "noderedis:courses",
  }
);

// Get the bookmarks for a user
app.get("/query", async (req: any, res: any) => {
  // Get the limit and query from query parameters
  const limit: number = req.query.limit;
  if (limit == null) {
    limit = 100;
  }
  const query: string = req.query.q;
  if (query == null) {
    res.send("{}");
    return;
  }

  // Get the courses from the database using redisearch
  const results = await client.ft.search('idx:animals', query, { // '@species:{dog}'
    LIMIT: {
      from: 0,
      size: limit
    }
  });

  // Send the results
  res.send(results);
});
