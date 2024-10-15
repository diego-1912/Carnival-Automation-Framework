import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    private readonly webOpsLogo: Locator;
    private dropdownMaps: Map<string, Map<string, Locator>>;
    private manufacturerDropdown: Locator;

    //select[@id='manufacturer-dropdown']

    constructor(page: Page) {
        super(page);
        this.webOpsLogo = page.getByRole('img').nth(1);
        this.manufacturerDropdown = page.locator("//select[@id='manufacturer-dropdown']");
        this.dropdownMaps = new Map();
        this.initializeDropdownMaps();
    }
    
    private initializeDropdownMaps(): void {
        // Admin dropdown
        const AdminDropdownMap = new Map<string, Locator>([
            ['dropdown', this.page.getByRole('button', { name: ' Admin' })],
            ['Manufacturer', this.page.getByRole('link', { name: 'Manufacturer' })],
        ]);

        this.dropdownMaps.set('Admin', AdminDropdownMap);
        // Add other dropdown maps here if needed
    }

    async isWebOpsLogoVisible(): Promise<boolean> {
        return this.handleAction(
            async () => {
                await this.webOpsLogo.waitFor({ state: 'visible', timeout: 5000 });
                return true;
            },
            'Checked WebOps logo visibility',
            'Failed to check WebOps logo visibility'
        );
    }


    async selectManufactuerdOptionFromAdminDropdwon(dropdownName: string, option: string): Promise<void> {
        await this.handleAction(
          async () => {
            const dropdownMap = this.dropdownMaps.get(dropdownName);
            if (!dropdownMap) {
              throw new Error(`Invalid dropdown name: ${dropdownName}`);
            }
    
            const dropdownLocator = dropdownMap.get('dropdown');
            const optionLocator = dropdownMap.get(option);
    
            if (!dropdownLocator || !optionLocator) {
              throw new Error(`Invalid option for ${dropdownName} dropdown: ${option}`);
            }
    
            await dropdownLocator.click();
            await optionLocator.click();
          },
          `Selected ${dropdownName} dropdown option: ${option}`,
          `Failed to select ${dropdownName} dropdown option: ${option}`
        );
      }
      
      /**
     * Select a manufacturer from the dropdown by index
     * @param index The index of the manufacturer option to select (0-based)
     */
      async selectManufacturerByIndex(index: number): Promise<void> {
        await this.handleAction(
            async () => {
                await this.selectDropdownOptionByIndex(
                    "select#manufacturer-dropdown",
                    index,
                    "Manufacturer"
                );
            },
            `Selected manufacturer at index: ${index}`,
            `Failed to select manufacturer at index: ${index}`
        );
    }


    
}
export default DashboardPage;