import { queryCourses } from "../lib/redisearch.ts";

// Get courses handler
export async function getCourses(req: any, res: any): Promise<void> {
  // Get the query from the query parameters
  let query: string = req.query.q;
  if (query == null) {
    res.send("{}");
    return;
  }

  // Get the limit from the query parameters
  const limit: number = parseInt(req.query.limit) || 100;

  // Track the start time
  const startTime = Date.now();

  // Query Redis
  let results: any;
  try {
    results = await queryCourses(":course.Course:index", query);
  } catch (err) {
    res.send({
      results: [],
      time: Date.now() - startTime
    });
    return;
  }

  // Send the results
  res.send({
    results: results,
    time: Date.now() - startTime
  });
}