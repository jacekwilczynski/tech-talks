import { Product } from './Product';

/*
This still is not pretty code, though it's definitely better than mixing business logic with SQL and HTTP-related things.

As pointed out by Arek Wilczynski, modifying received objects is not the best idea, and returning a new array
with new product objects would be much safer and more reliable.

Also, the product collection itself could perhaps be not an array but a custom ProductCollection class
that would guard its immutability and provide useful functions for collection operations - credits to Justus Maier.

And let's not even mention the horror of using floating-point operations for money :)))
 */
export default function applyPromotions(products: Product[]): void {
    if (new Date().getMonth() === 0) {
        for (const product of products) {
            if (product.price <= 25) {
                product.price = product.price * 0.9;
            }
        }
    }
};
