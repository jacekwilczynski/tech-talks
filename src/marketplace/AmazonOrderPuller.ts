import { HttpClient, Orders } from '@scaleleap/amazon-mws-api-sdk';
import { amazon as amazonConfig } from '../config';
import { createOrder } from '../order/order-repository';
import Money from 'js-money';
import Currencies from 'js-money/lib/currency';
import { getProductById, updateProduct } from '../product/product-repository';

export default class AmazonOrderPuller {
    private readonly httpClient = new HttpClient(amazonConfig);

    public async pullOrders(createdAfter: Date): Promise<void> {
        const orders = new Orders(this.httpClient);

        const [ordersList] = await orders.listOrders({
            MarketplaceId: [amazonConfig.marketplace.id],
            CreatedAfter: createdAfter,
        });

        for (const order of ordersList.Orders) {
            const [orderItemList] = await orders.listOrderItems(order);

            createOrder({
                id: order.AmazonOrderId,
                lineItems: orderItemList.OrderItems.map(orderItem => ({
                    productId: String(orderItem.SellerSKU),
                    quantity: orderItem.QuantityOrdered,
                    unitPrice: Money.fromDecimal(orderItem.ItemPrice?.Amount || 0, Currencies.EUR),
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
}
