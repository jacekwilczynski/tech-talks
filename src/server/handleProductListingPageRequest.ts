import { Request, Response } from 'express';
import { getAllProducts } from './product-repository';
import applyPromotions from './applyPromotions';

export default async function handleProductListingPageRequest(req: Request, res: Response): Promise<void> {
    const products = await getAllProducts();

    applyPromotions(products);

    res.render('product-listing.html.twig', { products });
}
