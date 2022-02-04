import { HttpClient, Orders } from '@scaleleap/amazon-mws-api-sdk';
import { amazon as amazonConfig } from '../config';
import { Order as ShopOrder } from '../order/Order';
import Money from 'js-money';
import Currencies from 'js-money/lib/currency';
import { MarketplaceAdapter } from './MarketplaceAdapter';

export default class Amazon implements MarketplaceAdapter {
    private readonly httpClient = new HttpClient(amazonConfig);

    public async fetchOrders(createdAfter: Date): Promise<ShopOrder[]> {
        const amazonOrderClient = new Orders(this.httpClient);

        const [amazonOrdersList] = await amazonOrderClient.listOrders({
            MarketplaceId: [amazonConfig.marketplace.id],
            CreatedAfter: createdAfter,
        });

        const shopOrders: ShopOrder[] = [];

        for (const amazonOrder of amazonOrdersList.Orders) {
            const [orderItemList] = await amazonOrderClient.listOrderItems(amazonOrder);

            shopOrders.push({
                id: amazonOrder.AmazonOrderId,
                lineItems: orderItemList.OrderItems.map(orderItem => ({
                    productId: String(orderItem.SellerSKU),
                    quantity: orderItem.QuantityOrdered,
                    unitPrice: Money.fromDecimal(orderItem.ItemPrice?.Amount || 0, Currencies.EUR),
                })),
            });
        }

        return shopOrders;
    }
}
