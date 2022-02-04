import { OrderRepository } from '../order/order-repository';
import db from '../db';
import { Order } from '../order/Order';

export default class SqlOrderRepository implements OrderRepository {
    public async createOrder(order: Order): Promise<void> {
        await db.execute(
            'INSERT INTO `orders` (`id`) VALUES (?)',
            [order.id],
        );

        await Promise.all(order.lineItems.map(lineItem => db.execute(
            'INSERT INTO `order_line_items` (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
            [order.id, lineItem.productId, lineItem.quantity, lineItem.unitPrice.amount],
        )));
    }

    public async doesOrderExist(id: string): Promise<boolean> {
        const [rows] = db.query('SELECT id FROM `orders` LIMIT 1') as any;

        return rows.length > 0;
    }
};
