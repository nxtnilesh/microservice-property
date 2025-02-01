import Property from "../models/Property.js";
import elasticClient from "../config/elasticsearch.js";

export const createProperty = async (propertyData) => {
  try {
    // Save to MongoDB
    const property = await Property.create(propertyData);

    // Index in Elasticsearch
    await elasticClient.index({
      index: "properties",
      id: property._id.toString(),
      body: property.toObject(),
    });

    return property;
  } catch (error) {
    throw new Error(`Error saving property: ${error.message}`);
  }
};
