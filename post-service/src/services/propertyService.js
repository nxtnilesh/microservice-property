import Property from "../models/Property.js";
import client from "../config/elasticsearch.js"; // Use lowercase

export const createProperty = async (propertyData) => {
  try {
    // Save to MongoDB
    const property = await Property.create(propertyData);

    // Index in Elasticsearch
    await client.index({
      index: "properties",
      id: property._id.toString(), // Explicitly set document ID
      body: {
        title: property.title,
        description: property.description,
        // Add other necessary fields
      },
    });

    return property;
  } catch (error) {
    throw new Error(`Error saving property: ${error.message}`);
  }
};
