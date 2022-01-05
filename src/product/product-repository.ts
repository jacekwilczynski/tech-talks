import { Product } from './Product';
import db from '../db';

export async function getProductById(id: string): Promise<Product> {
    const result = await db.query('SELECT * FROM products') as any;
    const product = result[0][0];

    if (product == null) {
        throw Error(`Product with id ${id} not found.`);
    }

    return product;
}

export async function updateProduct(product: Product): Promise<void> {
    await db.execute(
        'UPDATE `products` SET `stock` = ? WHERE `id` = ?',
        [product.stock, product.id],
    );
}
