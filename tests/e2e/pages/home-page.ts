import type { Locator, Page } from "@playwright/test";

/** Home page object: heading, hero CV link and the header language switch. */
export class HomePage {
  readonly heading: Locator;
  readonly cvLink: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole("heading", { level: 1 });
    this.cvLink = page.getByRole("main").getByRole("link", { name: /Download CV|Descargar CV/ });
  }

  async goto(path = "/"): Promise<void> {
    await this.page.goto(path);
  }

  /** The language switch is a pair of real links in the header (not a menu). */
  languageLink(locale: "es" | "en"): Locator {
    return this.page.getByRole("banner").locator(`a[hreflang="${locale}"]`);
  }

  async switchLanguage(locale: "es" | "en"): Promise<void> {
    await this.languageLink(locale).click();
  }
}
