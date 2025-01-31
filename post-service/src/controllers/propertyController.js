import { createProperty } from "../services/propertyService.js";

const addProperty = async (req, res) => {
  try {
    const property = await createProperty(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addProperty };
