import Property from "../models/property.js";
import { indexProperty } from "./elasticsearchService.js";

const createProperty = async (propertyData) => {
  try {
    const property = new Property(propertyData);
    await property.save();

    // Index in Elasticsearch
    await indexProperty(property);

    return property;
  } catch (error) {
    console.error("Error creating property:", error);
    throw new Error("Error creating property");
  }
};

export { createProperty };
