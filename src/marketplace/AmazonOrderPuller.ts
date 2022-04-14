import { HttpClient, Orders } from '@scaleleap/amazon-mws-api-sdk';
import { amazon as amazonConfig } from '../config';
import { createOrder } from '../order/order-repository';
import Money from 'js-money';
import Currencies from 'js-money/lib/currency';
import { getProductById, updateProduct } from '../product/product-repository';
import { Order } from '../order/Order';

export default class AmazonOrderPuller {
    private readonly httpClient = new HttpClient(amazonConfig);

    public async pullOrders(createdAfter: Date): Promise<void> {
        const orders = await this.fetchOrdersFromAmazon(createdAfter);

        for (const order of orders) {
            createOrder(order);
            await this.updateProductsStock(order);
        }
    }

    private async fetchOrdersFromAmazon(createdAfter: Date): Promise<Order[]> {
        const amazonOrders = new Orders(this.httpClient);

        const [ordersList] = await amazonOrders.listOrders({
            MarketplaceId: [amazonConfig.marketplace.id],
            CreatedAfter: createdAfter,
        });

        const shopOrders: Order[] = [];

        for (const order of ordersList.Orders) {
            const [orderItemList] = await amazonOrders.listOrderItems(order);

            shopOrders.push({
                id: order.AmazonOrderId,
                lineItems: orderItemList.OrderItems.map(orderItem => ({
                    productId: String(orderItem.SellerSKU),
                    quantity: orderItem.QuantityOrdered,
                    unitPrice: Money.fromDecimal(orderItem.ItemPrice?.Amount || 0, Currencies.EUR),
                })),
            });
        }

        return shopOrders;
    }

    private async updateProductsStock(order: Order): Promise<void> {
        for (const orderItem of order.lineItems) {
            const product = await getProductById(orderItem.productId);
            product.stock -= orderItem.quantity;
            updateProduct(product);
        }
    }
}
