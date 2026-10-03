import { expect, test } from "@playwright/test";

// prefetchAll warms every visible internal link; the CV downloads must not be among them
// (a PDF fetched on viewport wastes mobile data for a file few visitors open).
for (const path of ["/", "/services"]) {
  test(`CV download links on ${path} are opted out of prefetch`, async ({ page }) => {
    const pdfRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().endsWith(".pdf")) pdfRequests.push(request.url());
    });

    await page.goto(path);
    const cvLinks = page.locator('a[href$=".pdf"]');
    await expect(cvLinks.first()).toBeAttached();

    // Bring every CV link into the viewport (the prefetch trigger), then let the network settle.
    for (const link of await cvLinks.all()) {
      await expect(link).toHaveAttribute("data-astro-prefetch", "false");
      await link.scrollIntoViewIfNeeded();
    }
    await page.waitForLoadState("networkidle");

    expect(pdfRequests).toEqual([]);
  });
}
