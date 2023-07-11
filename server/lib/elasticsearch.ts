import { Client } from "@elastic/elasticsearch";
const client: any = new Client({
  node: "http://localhost:9200",
});
// initCoursesIndex();

// Initialize the courses index
async function initCoursesIndex(): Promise<number> {
  // Initialize the courses index
  try {
    await client.indices.create({
      index: "courses",
    });
  }
  catch (err) {
    return -1;
  }
  return 0;
}

// Bulk index the course data
async function bulkIndexCourses() {
  const data = require("../../data/data.json");
  const courses = JSON.parse(JSON.stringify(data));
  await bulkIndex("courses", courses);
}

// Bulk index function, run this to add all data to Elasticsearch
async function bulkIndex(index: string, data: any): Promise<void> {
  let result: any[] = [];
  for (let i = 0; i < data.length; i++) {
    result.push({
      index: {
        _index: index,
        _id: i,
      },
    });
    result.push({
      title: data[i].title,
      description: data[i].description,
      pre_requisites: data[i].pre_requisites,
      name: data[i].name,
    });
  }
  await client.bulk({ refresh: true, data: result });
  await client.indices.refresh({ index: index });
};

// Query function, run this to query the data in Elasticsearch
async function queryCourses(index: string, query: string): Promise<any> {
  const { body } = await client.search({
    index: index,
    body: {
      query: {
        match: {
          title: query,
          description: query,
          pre_requisites: query,
          name: query,
        },
      },
    },
  });

  // Return the results
  return body.hits.hits.map((hit: any) => {
    return hit._source;
  });
};

// Insert data into Elasticsearch
async function insert(index: string, data: any): Promise<void> {
  await client.index({
    index: index,
    body: {
      title: data.title,
      description: data.description,
      pre_requisites: data.pre_requisites,
      name: data.name,
    },
  });
  await client.indices.refresh({ index: index });
};
