import { Product } from './Product';

export default function applyPromotions(products: Product[]): void {
    if (new Date().getMonth() === 0) {
        for (const product of products) {
            if (product.price <= 25) {
                product.price = product.price * 0.9;
            }
        }
    }
};
