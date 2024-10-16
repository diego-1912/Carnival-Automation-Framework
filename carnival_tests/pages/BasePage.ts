import { Page } from '@playwright/test';
import ProjectLogger from '../config/Logger';
import winston from 'winston';

// Define a global test object that may or may not have a step method
declare const test: { step?: (name: string, fn: () => Promise<any>) => Promise<any> };

export abstract class BasePage {
  protected page: Page;
  protected logger: winston.Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = ProjectLogger.getLogger('BasePage');
  }

  protected async handleAction<T>(
    action: () => Promise<T>,
    successMessage: string,
    errorMessage: string
  ): Promise<T> {
    try {
      const result = await action();
      this.logger.info(successMessage);
      return result;
    } catch (error) {
      this.logger.error(`${errorMessage}, ${error}`);
      throw error;
    }
  }

  async goto(url: string) {
    await this.handleAction(
      () => this.page.goto(url),
      `Navigated to ${url}`,
      `Failed to navigate to ${url}`
    );
  }

  async clickButton(role: 'button' | 'link' | 'textbox' | 'checkbox', name: string) {
    await this.handleAction(
      () => this.page.getByRole(role, { name }).click(),
      `Clicked on button with role "${role}" and name "${name}"`,
      `Failed to click on button with role "${role}" and name "${name}"`
    );
  }

  async selectLabel(label: string, exact: boolean = true) {
    await this.handleAction(
      () => this.page.getByLabel(label, { exact }).click(),
      `Selected label "${label}"`,
      `Failed to select label "${label}"`
    );
  }
}