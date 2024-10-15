# WebOps Automation Framework

## Project Description
This project is an automation testing framework for WebOps, built using TypeScript, JavaScript, and Playwright. It aims to provide a robust, efficient, and maintainable solution for automated testing of the WebOps application.

### Brief Overview
The framework utilizes Playwright's powerful capabilities to perform end-to-end testing across different browsers. It is designed with a focus on readability, extensibility, and ease of use.

### Purpose and Main Features
- End-to-end testing of WebOps application
- Cross-browser testing support
- Parallel test execution
- Detailed HTML reporting
- Configurable test environments

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Usage](#usage)
5. [Framework Architecture](#framework-architecture)
6. [Configuration](#configuration)
7. [Best Practices](#best-practices)
8. [Naming Standards](#naming-standards)
9. [Development Environment](#development-environment)

## Prerequisites
- Node.js (version 14 or higher recommended)
- npm (usually comes with Node.js)
- Git (for cloning the repository)

The following packages will be installed during the installation process:
- Playwright
- Winston (for logging)
- TypeScript

## Installation
1. Clone the repository:
   ```
   git clone [repository URL]
   ```
2. Navigate to the project directory:
   ```
   cd webops-ui-testing-framework
   ```
3. Install the required dependencies:
   ```
   npm install
   ```
4. Install Playwright browsers:
   ```
   npx playwright install
   ```
5. Install Winston for logging:
   ```
   npm install winston
   ```
6. Install TypeScript:
   ```
   npm install typescript
   ```

## Project Structure
```
WEBOPS UI TESTING FRAMEWORK/
│
├── node_modules/
├── playwright-report/
│   ├── data/
│   ├── trace/
│   └── index.html
├── test-results/
├── webops_tests/
│   ├── config/
│   ├── Fixtures/
│   ├── helpers/
│   ├── pages/
│   │   ├── admin/
│   │   ├── login/
│   │   ├── BasePage.ts
│   │   ├── DashboardPage.ts
│   │   └── NavigationMenu.ts
│   └── tests/
│       ├── end-to-end-flow-tests/
│       └── page-specific-tests/
├── storageState.json
├── auth-state.json
├── global.d.ts
├── package-lock.json
├── package.json
├── playwright.config.ts
├── test-run.log
└── tsconfig.json
```

### Key Directories and Files

- `playwright-report/`: Contains the HTML report generated after test execution, including test data and traces.

- `test-results/`: Stores the raw output and artifacts from test runs.

- `webops_tests/`: The core directory for all test-related code.
  - `config/`: Configuration files for test setup and environment.
  - `Fixtures/`: Reusable test fixtures for setting up test conditions.
  - `helpers/`: Utility functions and helper methods used across tests.
  - `pages/`: Page Object Model (POM) implementations.
    - `BasePage.ts`: The base class for all page objects.
    - `DashboardPage.ts` and `NavigationMenu.ts`: Specific page objects.
  - `tests/`: Contains all test scripts.
    - `end-to-end-flow-tests/`: Tests that cover complete user flows.
    - `page-specific-tests/`: Tests focused on individual pages or components.

- `storageState.json` and `auth-state.json`: Store session data, used for maintaining login state across tests.

- `global.d.ts`: Global TypeScript declarations.

- `playwright.config.ts`: The main configuration file for Playwright, defining test execution settings.

- `package.json` and `package-lock.json`: Define the project dependencies and scripts.

- `tsconfig.json`: TypeScript compiler configuration.

This structure follows a well-organized pattern for test automation, separating concerns between configuration, page objects, test helpers, and the actual test scripts. The use of a Page Object Model (evidenced by the `pages` directory) suggests a focus on maintainability and reusability in the test code.

## Usage

### Running Tests

1. Run all tests:
   ```
   npx playwright test
   ```

2. Run a single test file:
   ```
   npx playwright test tests/example.spec.ts
   ```

3. Run a set of test files:
   ```
   npx playwright test tests/login/ tests/dashboard/
   ```

4. Run tests in headed mode:
   ```
   npx playwright test --headed
   ```

5. Run tests in a specific browser:
   ```
   npx playwright test --project=chromium
   ```

6. Run tests with debug mode:
   ```
   npx playwright test --debug
   ```

7. Run tests and generate HTML report:
   ```
   npx playwright test --reporter=html
   ```

8. Run tests with specific tag:
   ```
   npx playwright test --grep @smoke
   ```

### Creating Tests

Add new test files with the `.spec.ts` extension in the `webops_tests/tests/` directory.

### Environment Variables

Override environment variables when running tests:
```
TEST_BASE_URL=https://custom-url.com TEST_USERNAME=user TEST_PASSWORD=pass npx playwright test
```

### Debugging

To debug tests, you can use the Playwright Inspector. Run your tests with the `--debug` flag:
```
npx playwright test --debug
```

This will open the Playwright Inspector, allowing you to step through your tests, inspect the DOM, and more.

## Framework Architecture
The framework follows the Page Object Model (POM) design pattern, which enhances test maintenance and reduces code duplication. Key components include:

- BasePage: A foundation class for all page objects, providing common functionalities.
- Page Objects: Represent web pages or components, encapsulating page-specific elements and actions.
- Fixtures: Set up consistent test environments and data.
- Helpers: Utility functions for common operations across tests.

## Configuration
The main configuration file is `playwright.config.ts`. It includes settings for:
- Test directory and file matching
- Timeout settings
- Parallelization options
- Reporter configuration
- Browser settings
- Base URL and authentication credentials

Test environments can be configured by modifying the `playwright.config.ts` file or by using environment variables as shown in the Usage section.

## Best Practices
- Use descriptive names for test files and test cases
- Follow TypeScript best practices and coding standards
- Keep tests independent and atomic
- Use environment variables for sensitive information
- Utilize the Page Object Model to maintain a clear separation between test logic and page interactions
- Write reusable helper functions for common operations
- Regularly update dependencies to ensure compatibility and security
- Use meaningful comments to explain complex logic or test scenarios
- Implement proper error handling and logging for better debugging
- Organize tests logically, separating end-to-end flows from page-specific tests
- Use fixtures to set up and tear down test data consistently
- Leverage Playwright's built-in waiting mechanisms to handle dynamic content
- Write tests that are resilient to minor UI changes
- Use CI/CD pipelines to run tests automatically on code changes
- Try to use locators based on role and label supported by Playwright, as they are more resilient to DOM changes. For example:
  ```typescript
  // Prefer this:
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Over this:
  await page.click('#submit-button');
  ```

## Naming Standards

### Class Naming
- Classes related to pages end with "page.ts"
- Classes related to tests end with "spec.ts"
- Fixture names end with "fixture"

### Naming Conventions for UI Automation Elements and Methods

| Element Type | Locator Naming | Method Naming |
|--------------|----------------|---------------|
| Accordion Header | Accordion Header name + suffix "Accordion" | Starts with "expand" |
| | Example: contactAccordion | Example: expandContactAccordion |
| Button | Button name + suffix "Button" | Starts with "click" |
| | Example: saveButton | Example: clickSaveButton |
| Checkbox | Checkbox name + suffix "Checkbox" | Starts with "check" |
| | Example: activeCheckbox | Example: checkActiveCheckbox |
| Dropdown | Dropdown name + suffix "Dropdown" | Starts with "select" |
| | Example: countryDropdown | Example: selectCountry |
| Input Field | Input name + suffix "Input" | Starts with "set" or "search" |
| | Example: searchInput, numberOfDaysInput | Example: setNumberOfDays, searchName |
| Link | Link name + suffix "Link" | Starts with "open" |
| | Example: forgotPasswordLink | Example: openPasswordLink |
| Table | Table name + suffix "Table" | Starts with "select" |
| | Example: customersTable | Example: selectCustomerTable |

## Development Environment

### Recommended IDE
We recommend using Visual Studio Code (VS Code) as the Integrated Development Environment (IDE) for this project. VS Code offers excellent support for TypeScript and has a native Playwright extension that enhances the development and debugging experience for Playwright tests.

### Visual Studio Code Setup
1. Download and install Visual Studio Code from [https://code.visualstudio.com/](https://code.visualstudio.com/)

2. Install the Playwright Test for VSCode extension:
   - Open VS Code
   - Go to the Extensions view (Ctrl+Shift+X)
   - Search for "Playwright Test for VSCode"
   - Click "Install"

### Benefits of Playwright Test for VSCode
- Run and debug tests directly from the VS Code interface
- View test results inline
- Easy test generation and modification
- Integrated test explorer for better test management
- Automatic code completion and IntelliSense for Playwright APIs

To learn more about using the Playwright extension in VS Code, visit the [official documentation](https://playwright.dev/docs/getting-started-vscode).

