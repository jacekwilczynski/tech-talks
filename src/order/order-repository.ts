import { Order, OrderLineItem } from './Order';
import db from '../db';

export async function doesOrderExist(orderId: string): Promise<boolean> {
    const [rows] = await db.query(
        'SELECT `id` FROM `orders` WHERE `id` = ?',
        [orderId],
    );

    return Array.isArray(rows) && rows.length > 0;
}

export async function createOrder(order: Order): Promise<void> {
    await db.execute(
        'INSERT INTO `orders` (`id`) VALUES (?)',
        [order.id],
    );

    await Promise.all(order.lineItems.map(lineItem => insertLineItem(order.id, lineItem)));
}

async function insertLineItem(orderId: string, lineItem: OrderLineItem): Promise<void> {
    await db.execute(
        'INSERT INTO `order_line_items` (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
        [orderId, lineItem.productId, lineItem.quantity, lineItem.unitPrice.amount],
    );
}
