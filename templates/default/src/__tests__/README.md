NextJS automatically assumes any `js` or `jsx` files in `/src/pages` should be compiled to actual routes. This causes problems for the unit test files which are named `.test.jsx`. Therefore unit tests for pages and APIs must be placed in a `__tests__` folder.

**Note:** Unit tests for components and helpers should remain in the same folder as the component themselves. Only test files for `/src/pages` should be in this `__tests__` directory.
