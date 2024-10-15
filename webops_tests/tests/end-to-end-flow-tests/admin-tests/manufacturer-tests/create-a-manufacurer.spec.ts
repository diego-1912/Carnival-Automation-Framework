import { test as base, Page, expect } from '@playwright/test';
import ProjectLogger from '../../../../config/Logger';
import { ManufacturerPage } from '../../../../pages/admin/manufacturer/ManufacturerPage';
import { ManufacturerEditPage } from '../../../../pages/admin/manufacturer/ManufactuerEditPage';
import { test } from '../../../../Fixtures/Create-Manufacturer-Fixture';
import { DashboardPage } from '../../../../pages/DashboardPage';
import { DataFactory } from '../../../../helpers/DataFactory';

const logger = ProjectLogger.getLogger('CreateManufacturerTest');

test.describe('Create and Edit a Manufacturer', () => {
  let manufacturerPage: ManufacturerPage;
  let manufacturerEditPage: ManufacturerEditPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    logger.info('Setting up test environment');
    const { baseURL } = test.info().project.use as any;

    // Instantiate page objects
    manufacturerPage = new ManufacturerPage(page);
    manufacturerEditPage = new ManufacturerEditPage(page);
    dashboardPage = new DashboardPage(page);

    await test.step('Navigate to the application', async () => {
      logger.info(`Navigating to ${baseURL}`);
      await page.goto(`${baseURL}/homePage`);
    });
  });

  test('User creates, validates, and edits a Manufacturer', async ({ page }) => {
    let manufacturerName: string;
    let manufacturerEprCode: string;
    let manufactuerCaseID: string;

    await test.step('User navigates to Manufacturer page', async () => {
      await dashboardPage.selectManufactuerdOptionFromAdminDropdwon('Admin', 'Manufacturer');
      await manufacturerPage.clickAddButton();
      await page.waitForLoadState('networkidle');
    });

    await test.step('User creates a new Manufacturer', async () => {
      manufacturerName = `Testing Manufacurer Name - ${DataFactory.generateRandomCode()}`;
      manufacturerEprCode = `Testing Manufacurer EPR - ${DataFactory.generateRandomCode()}`;
      manufactuerCaseID = `Testing Manufacurer Case- ${DataFactory.generateRandomCode()}`;

      await manufacturerEditPage.setManufacturerName(manufacturerName);
      await manufacturerEditPage.setManufacturerErpCode(manufacturerEprCode);
      await manufacturerEditPage.setManufacturerCaseId(manufactuerCaseID);

      await manufacturerEditPage.clickSave();
      logger.info(`Manufacturer "${manufacturerName}" created successfully`);
    });

    await test.step('User validates the creation of the new Manufacturer', async () => {
      const allNames = await manufacturerPage.getAllManufacturerNames();
      logger.info('All Manufacturer Names:');
      expect(allNames.length).toBeGreaterThan(0);

      const isFound = await manufacturerPage.isManufacturerInList(manufacturerName);
      expect(isFound).toBe(true);
      logger.info('Manufacturer creation validated successfully');
    });

    // Step 3: User edits the created Manufacturer
    await test.step('User edits the existing Manufacturer', async () => {
      logger.info('Editing the created Manufacturer');

      // Open the manufacturer for editing
      await manufacturerPage.clickIfManufacturerInList(manufacturerName);
      manufacturerName = `Testing Manufacurer Name - ${DataFactory.generateRandomCode()}`;
      manufacturerEprCode = `Testing Manufacurer EPR - ${DataFactory.generateRandomCode()}`;
      manufactuerCaseID = `Testing Manufacurer Case- ${DataFactory.generateRandomCode()}`;

      await manufacturerEditPage.setManufacturerName(manufacturerName);
      await manufacturerEditPage.setManufacturerErpCode(manufacturerEprCode);
      await manufacturerEditPage.setManufacturerCaseId(manufactuerCaseID);

      logger.info('Saving the updated Manufacturer');
      await manufacturerEditPage.clickSave();
      await page.waitForLoadState('load');
    });

    await test.step('User validates the updates of the recently updated Manufacturer', async () => {
      const isFound = await manufacturerPage.isManufacturerInList(manufacturerName);
      expect(isFound).toBe(true);

      // Corrected toHaveValue matchers with valid locators
  
      logger.info('Manufacturer update validated successfully');
    });
  });
});
