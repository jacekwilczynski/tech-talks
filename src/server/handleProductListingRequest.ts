import { Request, Response } from 'express';
import db from './db';

/*
Having 2 different shapes for the raw data from the database is unavoidable. Otherwise, we'd have to edit our business
logic code as well as HTML templates every time the storage mechanism changes (could be a database structure change or
even switching to fetching products from some REST API instead of an SQL database).

Of course, in a normal app we'd probably use an object-relational mapper (ORM) library to do the dirty work of mapping
raw data to pretty objects for us, so instead of having a DbProduct type we'd have some configuration code for the ORM.
 */

type DbProduct = {
    name: string;
    image_url: string;
    price: string;
};

type Product = {
    name: string;
    imageUrl: string;
    price: number;
};

export default async function handleProductListingRequest(req: Request, res: Response): Promise<void> {
    const queryResult = await db.query('SELECT * FROM products') as any;
    const dbProducts: DbProduct[] = queryResult[0];
    const products: Product[] = dbProducts.map((dbProduct: DbProduct): Product => ({
        name: dbProduct.name,
        imageUrl: dbProduct.image_url,
        price: Number(dbProduct.price),
    }));

    if (new Date().getMonth() === 0) {
        for (const product of products) {
            if (product.price <= 25) {
                product.price = product.price * 0.9;
            }
        }
    }

    res.render('product-listing.html.twig', { products });
}
