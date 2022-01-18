/*
This type definition is in its own file, because:
  - it's an entity used in multiple modules of our app (returned from product-repository, used by applyPromotions),
  - it doesn't belong to either of these modules more than it belongs to the other.
 */
export type Product = {
    name: string;
    imageUrl: string;
    price: number;
};
