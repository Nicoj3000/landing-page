import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base-page";

export type Language = "English" | "Español";

export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly languageButton: Locator;
  readonly cvLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole("heading", { level: 1 });
    // The button's accessible name flips between "Es"/"En" with the active
    // language; match both names so the theme toggler (also a header button)
    // is excluded.
    this.languageButton = page
      .getByRole("banner")
      .getByRole("button", { name: /^(es|en)$/i });
    this.cvLink = page.getByRole("link", { name: /Download CV|Descargar CV/ });
  }

  async goto(): Promise<void> {
    await super.goto("/");
  }

  async switchLanguage(language: Language): Promise<void> {
    const option = this.page.getByText(language, { exact: true });
    // A click that lands before React hydration is silently dropped, so
    // retry the click until the dropdown actually opens.
    await expect(async () => {
      await this.languageButton.click();
      await expect(option).toBeVisible({ timeout: 1000 });
    }).toPass();
    await option.click();
  }
}
