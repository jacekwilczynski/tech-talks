import db from './db';
import { Product } from './Product';

export async function getAllProducts(): Promise<Product[]> {
    const queryResult = await db.query('SELECT * FROM products') as any;
    const dbProducts: DbProduct[] = queryResult[0];

    return dbProducts.map((dbProduct: DbProduct): Product => ({
        name: dbProduct.name,
        imageUrl: dbProduct.image_url,
        price: Number(dbProduct.price),
    }));
}

type DbProduct = {
    name: string;
    image_url: string;
    price: string;
};
