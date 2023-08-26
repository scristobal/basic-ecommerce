import { expect, test as base, type Locator, type Page } from '@playwright/test';
import type { Product, Offer } from '$lib/types';
import { formatCurrency } from '$lib/helpers/currency';
import { load } from '../src/routes/+page.server';
import { getDiscount } from '$lib/core/offers';

// Page Object Model, https://github.com/microsoft/playwright/issues/20000#issuecomment-1378019385
class POM {
    main: Locator;
    cart: Locator;
    product: {
        add: Locator;
        remove: Locator;
        price: Locator;
        total: Locator;
        quantity: Locator;
        details: Locator;
    };
    checkout: Locator;

    constructor(page: Page, product: Product) {
        this.main = page.getByRole('main');
        const listing = page.getByTestId(`${product.code}:listing`);

        this.product = {
            add: listing.getByRole('button', { name: '+' }),
            remove: listing.getByRole('button', { name: '-' }),
            quantity: listing.getByRole('textbox'),
            price: this.main.getByTitle(`${product.code} price`),
            total: this.main.getByTitle(`${product.code} total`),
            details: listing.getByRole('link', { name: `A ${product.name} thumbnail image` })
        };

        this.cart = page.getByTestId('cart');
        this.checkout = page.getByRole('button', { name: 'Checkout' });
    }
}

const test = base.extend<{ data: { products: Product[]; offers: Offer[] }; product: Product; offer: Offer; pom: POM }>({
    data: await load(),
    product: async ({ data }, use) => {
        const product = data.products.at(0);
        if (product === undefined) throw new Error('No products found');
        use(product);
    },
    offer: async ({ data }, use) => {
        const offer = data.offers.at(0);
        if (offer === undefined) throw new Error('No offers found');
        use(offer);
    },
    pom: async function ({ page, product }, use) {
        await use(new POM(page, product));
    }
});

test.describe('Online store', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('The user should be able to add and remove products from the cart.', async ({ pom }) => {
        await expect(pom.product.quantity).toHaveValue('0');

        await pom.product.add.click();
        await pom.product.add.click();

        await expect(pom.product.quantity).toHaveValue('2');

        await pom.product.remove.click();
        await expect(pom.product.quantity).toHaveValue('1');
    });

    test('The user should be able to see the current state of the cart (number of items, discounts, etc.) as they are adding/removing items.', async ({ product, offer, pom }) => {
        let itemCount = 0;
        await expect(pom.product.price).toContainText(formatCurrency(product.price));

        await expect(pom.product.quantity).toHaveValue(itemCount.toFixed(0)); // number of product items in the cart
        expect(pom.cart).toContainText(`${itemCount} items`); // total items in the cart

        for (let times = 0; times < offer.minPurchase; times++) {
            await pom.product.add.click();
            itemCount++;
            await expect(pom.product.total).toContainText(formatCurrency(itemCount * product.price));

            await expect(pom.product.quantity).toHaveValue(itemCount.toFixed(0)); // updated number of product items in the cart
            expect(pom.cart).toContainText(`${itemCount} items`); // updated total items in the cart

            const discount = getDiscount(offer, product, itemCount);
            if (discount !== 0) await expect(pom.cart).toContainText(`${offer.name} -${formatCurrency(discount)}`); // applied discounts
        }

        await pom.product.remove.click();
        itemCount -= 1;

        await expect(pom.product.total).toContainText(formatCurrency(itemCount * product.price));

        await expect(pom.product.quantity).toHaveValue(itemCount.toFixed(0));
        await expect(pom.cart).toContainText(`${itemCount} items`);
    });

    test('The total amount (with discounts applied) should be calculated when the user pushes the `Checkout` button.', async ({ pom, product, offer }) => {
        for (let times = 1; times <= offer.minPurchase; times++) {
            await pom.product.add.click();
            await pom.checkout.click();
            const discount = getDiscount(offer, product, times);
            await expect(pom.cart).toContainText(`Total ${formatCurrency(product.price * times - discount)}`);
        }
    });

    test('A modal should open when the user clicks on each product in the cart. This modal should contain the details of the clicked item.', async ({ page, pom, product }) => {
        await pom.product.details.click();
        await page.waitForURL(`product/${product.code}`);

        await expect(pom.main).toContainText(product.description);
        await expect(pom.main).toContainText(formatCurrency(product.price));

        await page.getByRole('button', { name: 'Add to cart' }).click();
        await page.waitForURL(`/`);

        await expect(pom.product.quantity).toHaveValue('1');
    });
});
