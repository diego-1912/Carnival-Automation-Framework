# Carnival Automation Framework

## Table of Contents
- [Project Description](#project-description)
- [Brief Overview](#brief-overview)
- [Important Links](#important-links)
- [Purpose and Main Features](#purpose-and-main-features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [File Explanations](#file-explanations)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Running Tests](#running-tests)
  - [Creating Tests](#creating-tests)
- [Framework Architecture](#framework-architecture)
- [Best Practices](#best-practices)
- [Recommended IDE](#recommended-ide)
  - [Visual Studio Code Setup](#visual-studio-code-setup)
  - [Benefits of Playwright Test for VSCode](#benefits-of-playwright-test-for-vscode)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Project Description
This project is an automation testing framework for Carnival, built using TypeScript, JavaScript, and Playwright. It aims to provide a robust, efficient, and maintainable solution for automated testing of the Carnival website, https://www.carnival.com/.

## Brief Overview
The framework utilizes Playwright's powerful capabilities to perform end-to-end testing across different browsers. It is designed with a focus on readability, extensibility, and ease of use.

## Important Links
- [Test Suite](https://docs.google.com/document/d/1ftrjMORw8UtkmTlLhq3cUIDM3PrGs0k38KFZpCwJmZM/edit?usp=sharing)
- [Execution Report](https://docs.google.com/document/d/1Q3oH_zLcutuFMaUUTWcbT46TGMeB_jQcBQHvHnKH-dY/edit?usp=sharing)
- [Bug Report](https://docs.google.com/document/d/1Qa5AtJ57KeXy_ZGbjFPQbvbOV21X80tRbQ4boyZg1x8/edit?usp=sharing)

## Purpose and Main Features
- End-to-end testing of the Carnival application
- Cross-browser testing support
- Parallel test execution
- Detailed HTML reporting
- Configurable test environments

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
   cd TEST AUTOMATION CHALLENGE
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
TEST AUTOMATION CHALLENGE
├── carnival_tests
│   ├── config
│   │   └── Logger.ts
│   ├── pages
│   │   ├── BasePage.ts
│   │   ├── DashboardPage.ts
│   │   ├── ItineraryPage.ts
│   │   └── ResultsPage.ts
│   └── tests
│       └── end-to-end-tests
│           ├── carnival-US1-tests.spec.ts
│           └── carnival-US2-tests.spec.ts
├── logs
├── node_modules
├── playwright-report
│   └── index.html
├── test-results
├── package-lock.json
├── package.json
├── playwright.config.ts
└── README.md
```

## File Explanations

- `carnival_tests/`: Main directory for test-related files
  - `config/`:
    - `Logger.ts`: Configuration for logging using Winston
  - `pages/`: Page Object Model (POM) files
    - `BasePage.ts`: Base class for all page objects
    - `DashboardPage.ts`: Page object for the dashboard
    - `ItineraryPage.ts`: Page object for the itinerary page
    - `ResultsPage.ts`: Page object for the results page
  - `tests/`:
    - `end-to-end-tests/`:
      - `carnival-US1-tests.spec.ts`: End-to-end tests for User Story 1
      - `carnival-US2-tests.spec.ts`: End-to-end tests for User Story 2
- `logs/`: Directory for log files
- `node_modules/`: Directory for installed Node.js packages
- `playwright-report/`:
  - `index.html`: HTML report generated after test execution
- `test-results/`: Directory for test execution results
- `package-lock.json`: Lock file for npm dependencies
- `package.json`: Project configuration and dependencies
- `playwright.config.ts`: Playwright configuration file
- `README.md`: This file, containing project documentation

## Configuration
The main configuration file is `playwright.config.ts`. It includes settings for:
- Test directory and file matching
- Timeout settings
- Parallelization options
- Reporter configuration
- Browser settings
- Base URL and authentication credentials

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
Add new test files with the `.spec.ts` extension in the `carnival_tests/tests/` directory.

## Framework Architecture
The framework follows the Page Object Model (POM) design pattern, which enhances test maintenance and reduces code duplication. Key components include:

- BasePage: A foundation class for all page objects, providing common functionalities.
- Page Objects: Represent web pages or components, encapsulating page-specific elements and actions.
- Fixtures: Set up consistent test environments and data.
- Helpers: Utility functions for common operations across tests.

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
- Try to use locators based on role and label supported by Playwright, as they are more resilient to DOM changes

## Recommended IDE
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

