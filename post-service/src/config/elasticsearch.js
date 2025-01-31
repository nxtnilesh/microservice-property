import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "http://localhost:9200", // Elasticsearch endpoint
});

export default client;
