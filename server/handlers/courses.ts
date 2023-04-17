import { client } from "../lib/redisearch.ts";

// Remove all special characters reserved by redisearch
function cleanQuery(query: string) {
  return query.replace(/[\+\-\=\>\<\!\@\~\&\|\(\)\[\]\{\}\^\~\*\?\:\\\/]/g, '');
}

// Get courses handler
export async function getCourses(req: any, res: any) {
  // Get the query from the query parameters
  let query: string = req.query.q;
  if (query == null) {
    res.send("{}");
    return;
  }

  // Clean the query
  query = cleanQuery(query);

  // Get the limit from the query parameters
  const limit: number = parseInt(req.query.limit) || 100;

  // Track the start time
  const startTime = Date.now();

  // Get the courses from the database using redisearch
  const results = await client.ft.search(':course.Course:index', `${query}*`, {
    LIMIT: {
      from: 0,
      size: limit,
    }
  });

  // Set the duration in milliseconds
  results.time = Date.now() - startTime;

  // Send the results
  res.send(results);
}