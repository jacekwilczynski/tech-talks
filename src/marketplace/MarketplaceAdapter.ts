import { Order } from '../order/Order';

export interface MarketplaceAdapter {
    fetchOrders(since: Date): Promise<Order[]>;
}
