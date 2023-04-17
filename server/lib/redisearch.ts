import { createClient, SchemaFieldTypes } from "redis";

// Initialize the rediseach client
export const client: any = createClient({
  url: "redis://127.0.0.1:6379"
});
await client.connect();
// await initIndex();

async function initIndex() {
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
  }
  catch (err) {
    console.log(err);
  }
}