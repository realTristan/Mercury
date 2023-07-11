import { createClient, SchemaFieldTypes } from "redis";

// Initialize the rediseach client
export const client: any = createClient({
  url: "redis://127.0.0.1:6379",
});
await client.connect();
// await initCoursesIndex();

// Initialize the courses index
async function initCoursesIndex(): Promise<void> {
  // Initialize the courses index
  try {
    await client.ft.create(
      "idx:courses:Course",
      {
        title: SchemaFieldTypes.TEXT,
        description: SchemaFieldTypes.TEXT,
        pre_requisites: SchemaFieldTypes.TEXT,
        name: SchemaFieldTypes.TEXT,
      },
      {
        ON: "HASH",
        PREFIX: "courses:Course",
      }
    );
  } catch (err) {
    console.log(err);
  }
}

// Remove all special characters reserved by redisearch
function cleanQuery(query: string) {
  return query.replace(/[\+\-\=\>\<\!\@\~\&\|\(\)\[\]\{\}\^\~\*\?\:\\\/]/g, '');
}

// Query function, run this to query the data in Redisearch
export async function queryCourses(index: string, query: string): Promise<any> {
  // Clean the query
  query = cleanQuery(query);
  
  // Get the results from Redisearch
  const { results } = await client.ft.search(index, `${query}*`, {
    LIMIT: {
      from: 0,
      size: 100,
    },
  });

  // Return the results
  return results;
}
