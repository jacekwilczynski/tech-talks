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

/*
We don't extract this type definition into a separate file not just because it's only used in this file.
The single-responsibility rationale for it is that this type will change together with the code that uses it and
for the same reasons. For example, if there is a change to the database schema, both the getAllProducts function
and the DbProduct type will have to be changed, in the same commit.
 */
type DbProduct = {
    name: string;
    image_url: string;
    price: string;
};
