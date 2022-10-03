# Coding standards

As this project is mainly written in JS, JSX, and CSS, formatting and linting
is only covered for these languages.

Linting is handled by ESLint. Part of the code style that ESLint adheres to can
be found on their [documentation](https://eslint.org/docs/latest/rules/). As
this project relies on React, the Airbnb JavaScript Style Guide
([available here](https://airbnb.io/javascript/)) is also used.

## Enforcing styling guidelines

Styling guidelines are enforced through the use of a few tools:

- [ESLint](https://github.com/eslint/eslint) is used for linting.
- [Prettier](https://github.com/prettier/prettier) is used for formatting.
- [Husky](https://github.com/typicode/husky) and lint-staged are used to format and lint as pre-commit hooks.

Additionally, as part of the CI/CD pipeline, commits are automatically checked
for linting and formatting issues when pushed to this repository. Builds that
fail these checks are not deployed.
