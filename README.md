# Frontend Challenge, Solution

This repo consist on the code for the Frontend Challenge described below.

> Live: [basic-ecommerce-samu.vercel.app](https://basic-ecommerce-samu.vercel.app/)

What was done:

- No dependencies, 100% type safe, including some exotic types like discriminated unions.

- Build using Svelte and Sveltekit, with a simple structure:
  - file based routing, each product page is SSR based on a slug
  - shared layout between the products/cart and each product page
  - each page have a minimal number of components
  - components contain minimal to no logic at all
  - use of server load functions to load the product list
  - the checkout is computed securely on the server using form actions

- Styled with Tailwind CSS
  - pixel perfect with the original design with some minor fixes
  - extended base theme with custom font
  - on the fly class generation using square bracket notation
  - assets processed to increase performance, eg. reduced image size

- Business logic separated from the UI with minimum boilerplate code and easily scalable:
  - The `BaseOffer` defines a common data interface + specialized interfaces for each offer type, eg. `BulkOffer` and `BuyXGetYOffer`
  - The function `getDiscount` contains the logic and it is easily extensible by adding more cases to the switch statement
  - Products and offers are stored in a mock database, this detaches the UI from the data, adding new product/offers is as simple as modifying the database, there is no need to rebuild the site
  - Money is modeled as cents of Euro, therefore integers, and formatted using native `Intl` API
  - Cart is modelled as a `writable` store and persisted using `localStorage`

- Thoroughly tested:
  - Each requirement has a corresponding e2e Playwright test
  - Test fixtures and POM (Page Object Model) makes it easy to create new tests
  - Core logic unit tested with Vitest

- Sparse comments whenever something is not straightforward, including sources/ref when possible

- Additional features
  - Show the number of items necessary to get a discount
  - The product page shows available offers
  - Products can have multiple offers
  - Cart is handled client side but checkout is done on the server side

- Deployed automatically using Vercel, Lighthouse scores:
![Performance report](/lh_report.png)
the low accessibility score is mainly due to low contrast color choices, fixing it would require to change the page design.

What could be improved:

- There is never enough tests, eg. component tests, more e2e, etc.
- Although the commit messages are clear, they do not follow conventional commit standard
- Accessibility could be improved, main problem is color contrast
- Internalization, only Euros and English language is supported
- Pagination of products/offers, as current design will not scale
- Improve overall styles, eg. animations and effects dark mode, color themes, responsive...
- Limited error handling, focused on happy path, logging and/or tracing could also be improved

---

> Original README.md

# Frontend Challenge

Hi! Welcome to this Frontend Challenge! First and foremost, please read this document carefully, as we want to make sure all the implementation details are well understood.

The challenge has been designed so that you can demonstrate your skills at problem solving, software architecture, and domain knowledge. We encourage you to clone, **not fork**, your implementation on Github (or similar) as a public repository, preferably without mentioning the name of the company you received the challenge from.

Please also add a LICENSE file to your implementation. Ideally something that protects your copyrights like [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html) or [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## The Challenge

We've decided to run an online store that sells 3 physical products for now. Our current stock consists of the following products:

```
Code         | Name         |  Price
--------------------------------------
TSHIRT       | T-Shirt      |  20.00€
MUG          | Coffee Mug   |   7.50€
CAP          | Cap          |   5.00€
```

Various departments have insisted on the following discounts:

- The sales department thinks a buy 2 get 1 free promotion will work best (buy two of the same product, get one free), and would like to apply this only to `CAP` items.
- The CFO insists that the best way to increase sales is with discounts on bulk purchases (buying x or more of a product, the price of that product is reduced), and requests that if you buy 3 or more `TSHIRT` items the price per unit should be reduced by 25%.

## The Requirements

1. The user should be able to add and remove products from the cart.
1. The user should be able to see the current state of the cart (number of items, discounts, etc.) as they're adding/removing items.
1. The total amount (with discounts applied) should be calculated when the user pushes the `Checkout` button.
1. A modal should open when the user clicks on each product in the cart. This modal should contain the details of the clicked item. You'll find here the [UI design](https://www.figma.com/file/ZxwGXecd3hkXshovOC8lRZ/Shopping-cart-challenge) and all the assets you will need inside `/public` folder.

Examples:

```
Items: CAP, TSHIRT, MUG
Total: 32.50€

Items: CAP, TSHIRT
Total: 25.00€

Items: TSHIRT, TSHIRT, TSHIRT, CAP, TSHIRT
Total: 65.00€

Items: CAP, TSHIRT, CAP, CAP, MUG, TSHIRT, TSHIRT
Total: 62.50€
```

### The solution should

- Be written in Typescript (let us know if this is your first time!)
- Be built using Svelte, React, Vue, or similar component based framework.
- Focus on solving the business problem (less boilerplate!)
- Have a clear structure.
- Be easy to grow with new functionality.

### Bonus Points For

- Unit tests
- Functional tests
- Dealing with money as integers
- Formatting money output
- Useful comments
- Documentation
- Docker images / CI
- Commit messages
