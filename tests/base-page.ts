import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string): Promise<void> {
    // networkidle never settles on this site: the Spline 3D scene keeps
    // streaming assets, so wait for the DOM and let web-first assertions
    // handle readiness.
    await this.page.goto(path, { waitUntil: "domcontentloaded" });
  }
}
