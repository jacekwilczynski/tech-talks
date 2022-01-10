import { Request, Response } from 'express';
import fs from 'fs/promises';

export default async function handleProductListingRequest(req: Request, res: Response): Promise<void> {
    const productsFileContents = await fs.readFile(__dirname + '/../../data/products.json', 'utf-8');
    const products = JSON.parse(productsFileContents);

    if (new Date().getMonth() === 0) {
        for (const product of products) {
            product.price = product.price * 0.9;
        }
    }

    res.render('product-listing.html.twig', { products });
}
