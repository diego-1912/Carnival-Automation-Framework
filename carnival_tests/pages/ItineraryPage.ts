import { Page, Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class ItineraryPage extends BasePage {
    private startBookingLink: Locator;
    private getToKnowElement: Locator;
    private onboardActivitiesElement: Locator;
    private onboardDiningElement: Locator;
  


  
    constructor(page: Page) {
      super(page);
      this.startBookingLink = page.getByRole('link', { name: 'START BOOKING' });
      this.getToKnowElement = page.locator("//span[contains(@data-testid, 'shipTitle') and starts-with(text(), 'Get to Know')]");
    this.onboardActivitiesElement = page.locator("//h3[@data-testid='obaSectionTitle' and contains(text(), 'Onboard Activities')]");
    this.onboardDiningElement = page.locator("//h3[@data-testid='obaSectionTitle' and contains(text(), 'Onboard Dining')]");
    
    }
    async validateIfAllItinerayElementsArePresent(): Promise<void> {
      await this.page.waitForTimeout(5000);
      // Check if the elements are visible
      const isGetToKnowVisible = await this.getToKnowElement.isVisible();
      const isOnboardActivitiesVisible = await this.onboardActivitiesElement.isVisible();
      const isOnboardDiningVisible = await this.onboardDiningElement.isVisible();
  
      // Throw errors if any element is not visible
      if (!isGetToKnowVisible) {
        throw new Error('The "Get to Know" element is not visible on the page.');
      }
      if (!isOnboardActivitiesVisible) {
        throw new Error('The "Onboard Activities" element is not visible on the page.');
      }
      if (!isOnboardDiningVisible) {
        throw new Error('The "Onboard Dining" element is not visible on the page.');
      }
  
      // Log success if all elements are visible
      console.log('All required elements ("Get to Know", "Onboard Activities", and "Onboard Dining") are visible.');
    }
  
    async startBooking() {
      await this.handleAction(
        () => this.startBookingLink.click(),
        `Clicked 'START BOOKING' link`,
        `Failed to click 'START BOOKING' link`
      );
    }
  // Method to validate if the "START BOOKING" button is visible
  async validateStartBookingButtonIsShown(): Promise<void> {
    await this.page.waitForTimeout(5000);
    // Check if the "START BOOKING" button is visible
    const isStartBookingVisible = await this.startBookingLink.isVisible();

    // Throw an error if the button is not visible
    if (!isStartBookingVisible) {
      throw new Error('The "START BOOKING" button is not visible on the page.');
    }

    // Log success if the button is visible
    console.log('The "START BOOKING" button is visible.');
  }


  }