import { Request, Response } from 'express';
import { getAllProducts } from './product-repository';
import applyPromotions from './applyPromotions';

/*
Now this function has only one responsibility: the big picture of how this type of request is handled.
You can add or remove general steps, but changes to the details of how each step works do not leak here.
You can now change the storage mechanism, promotion logic, or the view, without having to touch this file.
 */
export default async function handleProductListingRequest(req: Request, res: Response): Promise<void> {
    const products = await getAllProducts();

    applyPromotions(products);

    res.render('product-listing.html.twig', { products });
}
