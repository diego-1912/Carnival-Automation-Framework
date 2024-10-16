import { test as base, Page, expect } from '@playwright/test';
import ProjectLogger from '../../config/Logger';
import { DashboardPage } from '../../pages/DashboardPage';
import { ResultsPage } from '../../pages/ResultsPage';
import { ItineraryPage } from '../../pages/ItineraryPage';

const logger = ProjectLogger.getLogger('CreateCompanyTest');

interface TestFixtures {
  page: Page;
}

const test = base.extend<TestFixtures>({
  page: async ({ page }, use) => {
    await use(page);
  },
});

test.describe('Test Suite: User story 2', () => {
  let dashboardPage: DashboardPage;
  let resultsPage: ResultsPage;
  let itineraryPage: ItineraryPage;

  // This block runs before each test case
  test.beforeEach(async ({ page }) => {
    const baseURL = 'https://www.carnival.com/'; // Hardcoding baseURL since it's already available in the config
    logger.info('User navigates to Carnival Home Page');
    
    dashboardPage = new DashboardPage(page);
    resultsPage = new ResultsPage(page);
    itineraryPage = new ItineraryPage(page);

    await test.step('User navigates to the homepage', async () => {
      logger.info(`Navigating to Carnival Home Page: ${baseURL}`);
      await page.goto(baseURL);
      await page.waitForLoadState();
      await expect(page).toHaveURL(baseURL);
      logger.info('Successfully navigated to Carnival Home Page');
    });
  });

  // Individual test cases
  test('TC_01 - Verify cruise results between 6 and 9 days are displayed in a grid view', async ({ page }) => {
    await test.step('Select destination and duration', async () => {
      logger.info('Selecting destination and duration for cruise search');
      await dashboardPage.clickOnTheSailToButton();
      await dashboardPage.clickOnTheBahamasOption();
      await dashboardPage.clickOnTheDurationOption();
      await dashboardPage.clickOnNineDaysButton();
      await dashboardPage.clickOnSearchCruisesButton();
      logger.info('Search initiated for cruises to The Bahamas with 6-9 days duration');
    });

    await test.step('Validate cruise durations', async () => {
      logger.info('Extracting and validating cruise durations');
      const daysArray = await resultsPage.extractDays();
      await resultsPage.validateDaysInRange(6, 9);
      logger.info('Cruise durations validated successfully');
      console.log('Extracted days:', daysArray);
    });
  });

  test('TC_02 - Search cruise to The Bahamas and filter by price', async ({ page }) => {
    await test.step('Select destination and duration', async () => {
      logger.info('Selecting destination and duration for cruise search');
      await dashboardPage.clickOnTheSailToButton();
      await dashboardPage.clickOnTheBahamasOption();
      await dashboardPage.clickOnTheDurationOption();
      await dashboardPage.clickOnNineDaysButton();
      await dashboardPage.clickOnSearchCruisesButton();
      logger.info('Search initiated for cruises to The Bahamas with 6-9 days duration');
    });

    await test.step('Filter cruise results by price', async () => {
      const minPrice = 600;
      const maxPrice = 700;
      logger.info(`Setting price filter: Min Price = ${minPrice}, Max Price = ${maxPrice}`);
      await resultsPage.setMinimiunAndMaximunVacationBudget(minPrice, maxPrice);
      const allPrices = await resultsPage.extractAllPrices();
      logger.info('Extracted prices:', allPrices);
      await resultsPage.validatePricesInRange(minPrice, maxPrice);
      logger.info('Price filter validated successfully');
    });
  });

  test('TC_03 - Verify that results are sorted by price, with the cheapest option displayed first.', async () => {
    await test.step('Select destination and duration', async () => {
      logger.info('Selecting destination and duration for cruise search');
      await dashboardPage.clickOnTheSailToButton();
      await dashboardPage.clickOnTheBahamasOption();
      await dashboardPage.clickOnTheDurationOption();
      await dashboardPage.clickOnNineDaysButton();
      await dashboardPage.clickOnSearchCruisesButton();
      logger.info('Search initiated for cruises to The Bahamas with 6-9 days duration');
    });

    await test.step('Verify sorting by price', async () => {
      const lowToHighOption = 'fromprice';
      logger.info('Verifying that the low-to-high price option is selected by default');
      const isSelected = await resultsPage.isLowPriceOptionSelectedByDefault(lowToHighOption);
      expect(isSelected).toBe(true);
      logger.info('Verified that results are sorted by price in ascending order');
    });
  });

  test.afterAll(async ({ context }) => {
    logger.info('All tests in Part 1 completed. Cleaning up resources if needed.');
    await context.close();
  });
});