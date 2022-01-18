import { Request, Response } from 'express';
import { getAllProducts } from './product-repository';

export default async function handleProductListingRequest(req: Request, res: Response): Promise<void> {
    const products = await getAllProducts();

    if (new Date().getMonth() === 0) {
        for (const product of products) {
            if (product.price <= 25) {
                product.price = product.price * 0.9;
            }
        }
    }

    res.render('product-listing.html.twig', { products });
}
