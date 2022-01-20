import { Request, Response } from 'express';
import { getAllProducts } from './product-repository';
import applyPromotions from './applyPromotions';

export default async function handleProductListingApiRequest(req: Request, res: Response): Promise<void> {
    const products = await getAllProducts();

    applyPromotions(products);

    res.send(products);
}
