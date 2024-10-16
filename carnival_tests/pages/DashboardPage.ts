import { Page, Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    private sailToButton: Locator;
    private durationButton: Locator;
    private searchButton: Locator;
    private bahamasButton : Locator;
    private sixToNineDaysButton : Locator;
  
  
    constructor(page: Page) {
      super(page);
      this.sailToButton = page.locator("//span[contains(text(), 'Sail To')]");
      this.bahamasButton = page.getByLabel('The Bahamas', { exact: true });
      this.durationButton = page.locator("//span[contains(text(), 'Duration')]");
      this.searchButton = page.getByRole('button', { name: 'SEARCH CRUISES' });
      this.sixToNineDaysButton = page.getByLabel('- 9 Days');
      
    }
  
    async clickOnTheSailToButton(): Promise<void> {
      await this.page.waitForTimeout(4000);
      await this.handleAction(
        async () => await this.sailToButton.click(), 
        `Clicked 'Sail To' button`,
        `Failed to click 'Sail To' button`
      );
    }

    async clickOnTheBahamasOption(): Promise<void> {
      await this.handleAction(
        async () => await this.bahamasButton.click(), 
        `Clicked 'Bahamas' button`,
        `Failed to click 'Sail To' button`
      );
    }
  
    async clickOnTheDurationOption(): Promise<void> {
      await this.handleAction(
        async () => await this.durationButton.click(), 
        `Clicked 'Duration' button`,
        `Failed to click 'Sail To' button`
      );
    }
  
    async clickOnNineDaysButton(): Promise<void> {
      await this.handleAction(
        async () => await this.sixToNineDaysButton.click(), 
        `Clicked '6 to 9 days' button`,
        `Failed to click 'Sail To' button`
      );
    }
  

    async clickOnSearchCruisesButton() {
      await this.handleAction(
        () => this.searchButton.click(),
        `Clicked 'SEARCH CRUISES' button`,
        `Failed to click 'SEARCH CRUISES' button`
      );
    }



  }


  