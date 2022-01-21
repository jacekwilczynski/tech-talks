import { ADD_TO_CART_BUTTON } from './selectors';

export default class AddToCart {
    private readonly buttons: NodeListOf<HTMLButtonElement>;

    public constructor() {
        this.buttons = document.querySelectorAll(ADD_TO_CART_BUTTON);
    }

    public init(): void {
        this.buttons.forEach(button => {
            button.addEventListener(
                'click',
                () => this.onAddToCartClick(button),
            );
        });
    }

    private async onAddToCartClick(button: HTMLButtonElement): Promise<void> {
        if (button.disabled) {
            return;
        }

        button.disabled = true;
        const productId: number = Number(button.dataset.productId);
        await addToCart(productId);
        button.disabled = false;
    }
}

async function addToCart(productId: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    });
}
