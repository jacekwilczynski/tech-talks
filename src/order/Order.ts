import Money from 'js-money';

export type Order = {
    id: string;
    lineItems: OrderLineItem[];
}

export type OrderLineItem = {
    productId: string;
    quantity: number;
    unitPrice: Money;
}
