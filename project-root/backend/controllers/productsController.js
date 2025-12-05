import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Returnează toate produsele din baza de date, inclusiv categoria și proprietarul
export async function getAllProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, owner: true }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Creează un produs nou pe baza datelor primite în body
export async function createProduct(req, res) {
  try {
    const { name, expirationDate, ownerId, categoryId } = req.body;

    if (!name || !expirationDate || !ownerId) {
      return res.status(400).json({
        error: "Missing required fields: name, expirationDate, ownerId",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        expirationDate: new Date(expirationDate),
        ownerId: Number(ownerId),
        categoryId: categoryId ? Number(categoryId) : null,
      },
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Actualizează un produs existent după ID, modificând doar câmpurile trimise
export async function updateProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const { name, expirationDate, categoryId } = req.body;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        expirationDate: expirationDate ? new Date(expirationDate) : undefined,
        categoryId: categoryId ? Number(categoryId) : undefined
      }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Șterge un produs în funcție de ID
export async function deleteProduct(req, res) {
  try {
    const id = Number(req.params.id);

    const deleted = await prisma.product.delete({
      where: { id },
    });

    res.json({ message: "Product deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Marchează un produs ca fiind disponibil pentru revendicare
export async function markProductAsAvailable(req, res) {
  try {
    const id = Number(req.params.id);

    const updated = await prisma.product.update({
      where: { id },
      data: { available: true }   // marchează produsul ca disponibil
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
// Creează un claim pentru un produs, asociind utilizatorul care îl revendică
export async function claimProduct(req, res) {
  try {
    const productId = Number(req.params.id);
    const { claimerId } = req.body;

    if (!claimerId) {
      return res.status(400).json({ error: "claimerId is required" });
    }

    // verif produs
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // verif dacă user-ul există
    const user = await prisma.user.findUnique({
      where: { id: Number(claimerId) }
    });

    if (!user) {
      return res.status(404).json({ error: "Claimer user not found" });
    }

    // creăm claim-ul
    const claim = await prisma.claim.create({
      data: {
        productId: productId,
        claimerId: Number(claimerId)
      }
    });
    await prisma.product.update({
      where: { id: productId },
      data: { status: "CLAIMED" }
    });

    res.json({
      message: "Product claimed successfully",
      claim
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
