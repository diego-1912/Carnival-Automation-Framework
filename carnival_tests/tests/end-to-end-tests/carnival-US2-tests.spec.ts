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

test.describe('Test Suite: User story 1', () => {
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
  test('TC_04 - Verify that the itinerary link is displayed in the results page', async () => {
    await test.step('Select destination and duration', async () => {
      logger.info('Selecting destination and duration for cruise search');
      await dashboardPage.clickOnTheSailToButton();
      await dashboardPage.clickOnTheBahamasOption();
      await dashboardPage.clickOnTheDurationOption();
      await dashboardPage.clickOnNineDaysButton();
      await dashboardPage.clickOnSearchCruisesButton();
      logger.info('Search initiated for cruises to The Bahamas with 6-9 days duration');
    });

    await test.step('Verify itinerary links', async () => {
      logger.info('Verifying that itinerary links are displayed on the results page');
      const allLinksPresent = await resultsPage.areAllViewItineraryLinksPresent();
      expect(allLinksPresent).toBe(true);
      const itineraryLinksCount = await resultsPage.getViewItineraryLinksCount();
      logger.info(`Total "View Itinerary" links found: ${itineraryLinksCount}`);
    });
  });

  test('TC_05 - Verify that user can read about the daily itinerary', async () => {
    await test.step('Select destination and duration', async () => {
      logger.info('Selecting destination and duration for cruise search');
      await dashboardPage.clickOnTheSailToButton();
      await dashboardPage.clickOnTheBahamasOption();
      await dashboardPage.clickOnTheDurationOption();
      await dashboardPage.clickOnNineDaysButton();
      await dashboardPage.clickOnSearchCruisesButton();
      logger.info('Search initiated for cruises to The Bahamas with 6-9 days duration');
    });

    await test.step('Navigate to itinerary link and validate itinerary elements', async () => {
      logger.info('Navigating to an itinerary link and validating itinerary elements');
      await resultsPage.navigateToAnIntineraryLink();
      await itineraryPage.validateIfAllItinerayElementsArePresent();
      logger.info('Validated that all itinerary elements are present');
    });
  });

  test('TC_06 - Verify that the START BOOKING button is present', async () => {
    await test.step('Select destination and duration', async () => {
      logger.info('Selecting destination and duration for cruise search');
      await dashboardPage.clickOnTheSailToButton();
      await dashboardPage.clickOnTheBahamasOption();
      await dashboardPage.clickOnTheDurationOption();
      await dashboardPage.clickOnNineDaysButton();
      await dashboardPage.clickOnSearchCruisesButton();
      logger.info('Search initiated for cruises to The Bahamas with 6-9 days duration');
    });

    await test.step('Navigate to itinerary link and verify START BOOKING button', async () => {
      logger.info('Navigating to an itinerary link and verifying the START BOOKING button');
      await resultsPage.navigateToAnIntineraryLink();
      await itineraryPage.validateStartBookingButtonIsShown();
      logger.info('Validated that the START BOOKING button is present');
    });
  });

  test.afterAll(async ({ context }) => {
    logger.info('All tests in Part 1 completed. Cleaning up resources if needed.');
    await context.close();
  });
});