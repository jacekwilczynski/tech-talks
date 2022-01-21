import { ADD_TO_CART_BUTTON, NOT_BUYING_BUTTON } from './selectors';

export default class NotBuying {
    private readonly notBuyingButton: HTMLButtonElement;

    public constructor() {
        const notBuyingButton = document.querySelector(NOT_BUYING_BUTTON);

        if (!(notBuyingButton instanceof HTMLButtonElement)) {
            throw new Error('Button not found!');
        }

        this.notBuyingButton = notBuyingButton;
    }

    public init(): void {
        this.notBuyingButton.addEventListener('click', () => this.onClick());
    }

    private onClick(): void {
        const addToCartButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(ADD_TO_CART_BUTTON);

        addToCartButtons.forEach(addToCartButton => {
            addToCartButton.disabled = true;
        });
    }
}
