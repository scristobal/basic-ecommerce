# Frontend Challenge, Solution

This repo contains the code for this [Frontend Challenge](/CHALLENGE.md)

> Check it live at [basic-ecommerce-samu.vercel.app](https://basic-ecommerce-samu.vercel.app/)

## What was done

- Build on TypeScript, with no dependencies and 100% type safe, including some exotic types like discriminated unions, eg. `Offer` in `types.ts`

- Build using Svelte and Sveltekit, with a simple structure:
  - File based routing, each product page is SSR based on a slug.
  - Shared layout between the products/cart and each product page.
  - Each page has a minimal number of components.
  - Components contain minimal to no logic at all.
  - The product list is generated using a server load function.
  - Checkout is computed securely on the server using a form action.

- Styled with Tailwind CSS
  - Pixel perfect replication of the original design with some minor fixes.
  - Base theme extended with a custom font.
  - In some cases, on the fly class generation using square bracket notation.
  - Assets processed to increase performance, eg. reduced image size.

- Business logic separated from the UI with minimum boilerplate code and easily scalable:
  - The `BaseOffer` defines a common data interface + specialized interfaces for each offer type, eg. `BulkOffer` and `BuyXGetYOffer`.
  - The function `getDiscount` contains the logic and it is easily extensible by adding more cases to the switch statement.
  - Products and offers are stored in a mock database, this detaches the UI from the data, adding new product/offers is as simple as modifying the database, there is no need to rebuild the site.
  - Money is modeled as cents of Euro, therefore integers, and formatted using the ECMAScript Internationalization API, eg. `Intl`
  - Cart is modelled as a `writable` store and persisted using `localStorage`.
  - The `checkout` action is performed server side, the cart is send using `formData` and the server verifies the integrity and applicable offers sending back the actual total after discounts.

- Tested with Vitest (unit) and Playwright (e2e):
  - Each requirement has a corresponding e2e Playwright test
  - Test fixtures and POM (Page Object Model) makes it easy to create new tests
  - Core logic (offers and checkout) unit tested with Vitest
  - Each example corresponds to a unitary test of the checkout function.

## Additional features

In addition to the strictly necessary requirements the following features were also included:

- Show the number of items necessary to get a discount
- The product page shows available offers
- Products can have multiple offers
- Cart is handled client side but checkout is done on the server side
- Deployed automatically using Vercel, high Lighthouse scores:
![Performance report](/lh_report.png)
the low accessibility score is mainly due to low contrast color choices, fixing it would require to change the page design.

## What could be improved

Further work on this project could include:

- Included tests cover basic functionality and requirements, but not edge cases
- Although the commit messages are clear, they do not follow conventional commit standard
- Accessibility could be improved, main problem is color contrast
- Internalization, only Euros and English language is supported
- Pagination of products/offers, as current design will not scale
- Improve overall styles, eg. animations and effects, dark mode, color themes
- The design is not responsive
- Limited error handling, focused on happy path, logging and/or tracing could also be improved

## Instructions

Clone the repo and install dependencies with `npm i`

- **Develop**

    Launch a dev server with `npm run dev -- --open`

    Run checks with `npm run check` or in watch mode with `npm run check:watch`. Find problems by running the linter with `npm run lint` and format the code with `npm run format`

- **Test**

    Launch unit tests with `npm run test` or e2e with `npm run test:pw` or with the UI `npm run test:pw -- --ui`

- **Deploy**

    Manually build with `npm run build` or preview with `npm run preview`
