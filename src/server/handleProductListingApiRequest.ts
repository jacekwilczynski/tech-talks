import { Request, Response } from 'express';
import { getAllProducts } from './product-repository';
import applyPromotions from './applyPromotions';

/*
By extracting the different steps to independent functions, we achieved reusability and flexibility.
We were able to add this new endpoint with almost no code duplication.

Having kept product fetching and promotion application as separate steps, we can tweak the behavior of
each endpoint independently. For example, you can decide to apply promotions in the API but not on the HTML page,
or vice-versa, by adding/removing just 1 line of code.
 */
export default async function handleProductListingApiRequest(req: Request, res: Response): Promise<void> {
    const products = await getAllProducts();

    applyPromotions(products);

    res.send(products);
}
