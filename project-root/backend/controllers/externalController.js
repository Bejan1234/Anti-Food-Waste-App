import axios from "axios";

// Returnează informații despre un produs după barcode folosind OpenFoodFacts
export async function getFoodInfo(req, res) {
  try {
    const { barcode } = req.params;

    const response = await axios.get(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}`
    );

    // Dacă produsul nu există în baza OpenFoodFacts
    if (!response.data || !response.data.product) {
      return res.status(404).json({ error: "Product not found in OpenFoodFacts" });
    }

    res.json(response.data.product);
  } catch (err) {
    res.status(500).json({ error: "External API error" });
  }
}
