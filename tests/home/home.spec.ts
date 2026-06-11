import { test, expect } from "@playwright/test";
import { HomePage } from "./home-page";

test.describe("Home", () => {
  test(
    "Landing loads, language switch works and persists across reloads",
    { tag: ["@critical", "@e2e", "@home", "@HOME-E2E-001"] },
    async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.goto();
      await expect(homePage.heading).toBeVisible();

      await homePage.switchLanguage("English");
      await expect(homePage.heading).toContainText("If you can think it");
      await expect(homePage.cvLink).toHaveAttribute(
        "href",
        "/hoja-de-vida-en.pdf"
      );

      await page.reload();
      await expect(homePage.heading).toContainText("If you can think it");
    }
  );
});
