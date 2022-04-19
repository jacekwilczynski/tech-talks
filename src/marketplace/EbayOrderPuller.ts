import EbayApi from 'ebay-api';
import { ebay as ebayConfig } from '../config';
import { createOrder } from '../order/order-repository';
import Money from 'js-money';
import Currencies from 'js-money/lib/currency';
import { getProductById, updateProduct } from '../product/product-repository';

export default class EbayOrderPuller {
    private ebay = new EbayApi(ebayConfig);

    public async pullOrders(createdAfter: Date): Promise<void> {
        const orders: EbayOrder[] = await this.ebay.sell.fulfillment.getOrders({ filter: this.createFilter(createdAfter) });

        for (const order of orders) {
            createOrder({
                id: order.id,
                lineItems: order.items.map(item => ({
                    productId: String(item.articleId),
                    quantity: item.qty,
                    unitPrice: Money.fromDecimal(Number(item.pricePerItem || '0'), Currencies.EUR),
                })),
            });

            for (const orderItem of orderItemList.OrderItems) {
                const productId = String(orderItem.SellerSKU);

                const product = await getProductById(productId);
                product.stock -= orderItem.QuantityOrdered;
                updateProduct(product);
            }
        }
    }

    private createFilter(since: Date): string {
        const start = since.toISOString();
        const end = new Date().toISOString();

        return `creationdate:[${start}...${end}]`;
    }
}

interface EbayOrder {
    id: string;
    items: {
        articleId: string;
        qty: number;
        pricePerItem: string;
    }[];
}
