import client from "../config/elasticsearch.js";

/**
 * Search properties in Elasticsearch
 * @param {Object} query - Query to search properties
 * @returns {Array} List of matched properties
 */
export const searchProperties = async (query) => {
  try {
    const { body } = await client.search({
      index: "properties",
      body: {
        query: {
          bool: {
            must: query ? [{ match: { title: query } }] : [], // Search by title if query exists
          },
        },
      },
    });

    return body.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
    }));
  } catch (error) {
    throw new Error(`Elasticsearch Search Error: ${error.message}`);
  }
};
