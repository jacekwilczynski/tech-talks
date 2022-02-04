import { Order } from './Order';
import db from '../db';

export interface OrderRepository {
    doesOrderExist(id: string): Promise<boolean>;
    createOrder(order: Order): Promise<void>;
}
