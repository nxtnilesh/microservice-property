import mongoose from "mongoose";
import Property from "../models/Property.js";

const indexProperty = async (propertyId) => {
  try {
    // Fetch property from MongoDB
    const property = await Property.findById(propertyId).lean();
    if (!property) {
      throw new Error("Property not found");
    }

    // Format data for indexing
    const body = {
      ...property,
      user: property.user.toString(), // Ensure ObjectId is stored as a string
      datePosted: property.datePosted.toISOString(), // Convert date to string
    };

    await client.index({
      index: "properties",
      id: property._id.toString(),
      body,
    });

    console.log("Property indexed in Elasticsearch");
  } catch (error) {
    console.error("Error indexing property:", error);
  }
};

export { indexProperty };
