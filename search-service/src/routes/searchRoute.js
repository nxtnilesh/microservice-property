import express from "express";
import { searchProperties } from "../controller/searchService.js"; // Import the search service
import client from "../config/elasticsearch.js"; 

const router = express.Router();

// Get all properties from Elasticsearch
router.get("/", async (req, res) => {
  try {
    const { body } = await client.search({
      index: "properties",
      body: {
        query: {
          match_all: {}, // Query to fetch all properties
        },
      },
    });

    // Log the response body to inspect its structure
    console.log("Elasticsearch Response Body:", body);

    // Check if 'body.hits' exists and contains hits
    if (!body || !body.hits || !body.hits.hits || body.hits.hits.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No properties found in Elasticsearch.",
      });
    }

    // Map the Elasticsearch response to the structure we want to return
    const properties = body.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
    }));

    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error("Error fetching properties:", error); // Log the full error
    res.status(500).json({
      success: false,
      error: `Error fetching all properties: ${error.message}`,
    });
  }
});

// Get properties by title from Elasticsearch (search by title)
router.get("/properties/search", async (req, res) => {
  const { query } = req.query; // Get query from URL parameter

  try {
    if (!query) {
      return res.status(400).json({
        success: false,
        error: "Search query is required.",
      });
    }

    const properties = await searchProperties(query); // Ensure correct function call

    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No properties found matching the search query.",
      });
    }

    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error("Error searching properties:", error); // Log the full error
    res.status(500).json({
      success: false,
      error: `Error searching properties: ${error.message}`,
    });
  }
});

export default router;
