import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/home-page";

test.describe("language switch", () => {
  test(
    "ES -> EN -> ES updates URL, copy and CV link; the URL survives a reload",
    { tag: ["@critical", "@e2e", "@home", "@HOME-E2E-001"] },
    async ({ page }) => {
      const home = new HomePage(page);

      await home.goto("/");
      await expect(home.heading).toBeVisible();
      await expect(home.cvLink).toHaveAttribute("href", "/hoja-de-vida-es.pdf");

      await home.switchLanguage("en");
      await expect(page).toHaveURL(/\/en$/);
      await expect(home.heading).toContainText("If you can think it");
      await expect(home.cvLink).toHaveAttribute("href", "/hoja-de-vida-en.pdf");

      // The URL is the source of truth: a reload stays in English.
      await page.reload();
      await expect(page).toHaveURL(/\/en$/);
      await expect(home.heading).toContainText("If you can think it");

      await home.switchLanguage("es");
      await expect(page).toHaveURL(/\/$/);
      await expect(page.locator("html")).toHaveAttribute("lang", "es");
      await expect(home.heading).not.toContainText("If you can think it");
      await expect(home.cvLink).toHaveAttribute("href", "/hoja-de-vida-es.pdf");
    },
  );

  test("the active locale is marked and survives a page navigation", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto("/en");
    await expect(home.languageLink("en")).toHaveAttribute("aria-current", "true");
    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About me" }).click();
    await expect(page).toHaveURL(/\/en\/about-me$/);
    await expect(home.languageLink("en")).toHaveAttribute("aria-current", "true");
    await expect(home.languageLink("es")).toHaveAttribute("href", "/about-me");
  });
});
