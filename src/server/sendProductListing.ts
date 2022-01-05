import { Response } from 'express';
import fs from 'fs/promises';

export default async function sendProductListing(response: Response): Promise<void> {
    const productsFileContents = await fs.readFile(__dirname + '/../../data/products.json', 'utf-8');
    const products = JSON.parse(productsFileContents);

    response.write(`<h1>${products.length} products found:</h1>`);

    response.write(`<ul class="product-grid">`);

    for (const product of products) {
        if (new Date().getMonth() === 0) {
            product.price = product.price * 0.9;
        }

        response.write(`<li>`);
        response.write(`<img alt="${product.name}" src="/media/${product.imageUrl}"/>`);
        response.write(`<h2>${product.name}</h2>`);
        response.write(`<div class="product-grid-price">${product.price.toFixed(2)} €</div>`);
        response.write(`</li>`);
    }

    response.write(`</ul>`);
}
