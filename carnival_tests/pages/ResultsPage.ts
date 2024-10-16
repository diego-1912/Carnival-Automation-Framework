import { Page, Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class ResultsPage extends BasePage {
  private vacationBudgetButton: Locator;
  private minPriceInput: Locator;
  private maxPriceInput: Locator;
  private intineraryLink: Locator;
  private dayElements: Locator;
  private priceElements: Locator;
  private sortByPriceDropdown: Locator;
  private viewItineraryLink: Locator;


  //*[contains(text(), 'View Itinerary')]
  constructor(page: Page) {
    super(page);
    this.vacationBudgetButton = page.getByLabel('Vacation Budget');
    this.minPriceInput = page.getByTestId('minPriceInput');
    this.maxPriceInput = page.getByTestId('maxPriceInput');
    this.intineraryLink = page.locator('[data-testid^="cg-itinerary"]').first();
    this.dayElements = page.locator('//*[contains(text(), "-Day")]');
    this.priceElements = page.locator("//div[@data-testid='priceAmount']");
    this.sortByPriceDropdown = page.getByTestId('sortBySelect');
    this.viewItineraryLink = page.locator("//*[contains(text(), 'View Itinerary')]");




  }
  async setMinimiunAndMaximunVacationBudget(minPrice: number, maxPrice: number): Promise<void> {
    // Click on the vacation budget button
    await this.handleAction(
      async () => await this.vacationBudgetButton.click(),
      `Opened vacation budget filter`,
      `Failed to open vacation budget filter`
    );
  
    // Clear and enter min price (convert number to string)
    await this.handleAction(
      async () => await this.minPriceInput.fill(minPrice.toString()), // Convert number to string
      `Entered min price: ${minPrice}`,
      `Failed to enter min price: ${minPrice}`
    );
  
    // Clear and enter max price (convert number to string)
    await this.handleAction(
      async () => await this.maxPriceInput.fill(maxPrice.toString()), // Convert number to string
      `Entered max price: ${maxPrice}`,
      `Failed to enter max price: ${maxPrice}`
    );
  
    // Press 'Enter' to submit the filter
    await this.handleAction(
      async () => await this.maxPriceInput.press('Enter'),
      `Submitted price filter`,
      `Failed to submit price filter`
    );
  }
  
  
  
    async navigateToAnIntineraryLink(): Promise<void> {
      await this.handleAction(
        async () => await this.intineraryLink.click(), 
        `Clicked 'Sail To' button`,
        `Failed to click 'Sail To' button`
      );
    }
    
    async extractDays(): Promise<number[]> {
      const daysArray: number[] = [];
      await this.page.waitForTimeout(4000);
      // Get the count of elements containing '-Day'
      const count = await this.dayElements.count();
  
      // Log the number of elements found to verify the locator is correct
      console.log(`Found ${count} elements containing '-Day'`);
  
      if (count === 0) {
        throw new Error('No elements found matching the XPath. Check the locator.');
      }
  
      // Loop through each element and extract the number of days
      for (let i = 0; i < count; i++) {
        const dayText = await this.dayElements.nth(i).innerText();
  
        // Log the raw text to see what is being extracted
        console.log(`Extracted text from element ${i}: ${dayText}`);
  
        // Normalize text to remove extra spaces or line breaks
        const normalizedText = dayText.trim();
  
        // Extract the number before the word 'Day' using a regular expression
        const daysMatch = normalizedText.match(/(\d+)-Day/);
        if (daysMatch) {
          const days = parseInt(daysMatch[1], 10); // Convert the extracted string to a number
          daysArray.push(days); // Add the number to the array
        } else {
          console.warn(`Unable to extract days from text: ${dayText}`);
        }
      }
  
      return daysArray; // Return the array of extracted days
    }
  // Method to validate if all days in the array are between the provided range
  async validateDaysInRange(minDays: number, maxDays: number): Promise<void> {
    const daysArray = await this.extractDays();

    // Loop through each day and validate if it's in the range
    for (const days of daysArray) {
      if (days < minDays || days > maxDays) {
        throw new Error(`Cruise duration of ${days} days is out of the allowed range: ${minDays}-${maxDays}`);
      }
    }

    console.log(`All cruise durations are within the allowed range of ${minDays}-${maxDays} days.`);
  }

  async extractAllPrices(): Promise<number[]> {
    await this.page.waitForTimeout(3000);
    const pricesArray: number[] = [];

    // Get the count of price elements in the DOM
    const count = await this.priceElements.count();

    // Log the number of elements found
    console.log(`Found ${count} price elements`);

    // Loop through each element and extract the number value
    for (let i = 0; i < count; i++) {
      const priceText = await this.priceElements.nth(i).textContent();

      // Normalize the text and convert it to a number
      if (priceText) {
        const price = parseFloat(priceText.trim()); // Convert the string to a number
        pricesArray.push(price); // Add the number to the array
      } else {
        console.warn(`Unable to extract price from element ${i}`);
      }
    }

    return pricesArray; // Return the array of prices
  }

  async validatePricesInRange(minPrice: number, maxPrice: number): Promise<void> {
    // Extract all prices from the page
    const pricesArray = await this.extractAllPrices();

    // Loop through the prices and check if each is within the given range
    for (const price of pricesArray) {
      if (price < minPrice || price > maxPrice) {
        throw new Error(`Price ${price} is out of the allowed range: ${minPrice} - ${maxPrice}`);
      }
    }

    // If all prices are valid
    console.log(`All prices are within the allowed range: ${minPrice} - ${maxPrice}`);
  }

  async isLowPriceOptionSelectedByDefault(expectedValue: string): Promise<boolean> {
    // Get the selected option from the dropdown using its value
    const selectedOptionValue = await this.sortByPriceDropdown.evaluate((select: HTMLSelectElement) => select.value);

    // Log the selected option for debugging purposes
    console.log(`Currently selected option: ${selectedOptionValue}`);

    // Return true if the selected option matches the expected value, false otherwise
    return selectedOptionValue === expectedValue;
  }


  async areAllViewItineraryLinksPresent(): Promise<boolean> {
    await this.page.waitForTimeout(5000);
    // Get the count of all "View Itinerary" elements
    const count = await this.viewItineraryLink.count();

    // Log the count for debugging purposes
    console.log(`Found ${count} "View Itinerary" elements`);

    // Return true if at least one "View Itinerary" element is present
    return count > 0;
  }

  // Optionally, return the count of "View Itinerary" elements
  async getViewItineraryLinksCount(): Promise<number> {
    await this.page.waitForTimeout(5000);
    return await this.viewItineraryLink.count();
  }

  

  }


