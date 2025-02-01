import { createProperty } from "../services/propertyService.js";

export const postProperty = async (req, res) => {
  try {
    const property = await createProperty(req.body);
    res.status(201).json({ message: "Property Created", property });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
