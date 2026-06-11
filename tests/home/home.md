# E2E Tests: Home

**Suite ID:** `HOME-E2E`
**Feature:** Landing page smoke — load, i18n switch and persistence

---

## Test Case: `HOME-E2E-001` - Landing loads, language switch works and persists

**Priority:** `critical`

**Tags:**
- type → @e2e
- feature → @home

**Description/Objective:** Smoke test that guards the three behaviors a
visitor depends on: the page renders, the language can be switched, and the
preference survives a reload.

**Preconditions:**
- Dev server reachable at baseURL (Playwright starts it via webServer)
- Fresh browser context (no persisted language preference)

### Flow Steps:
1. Navigate to `/`
2. Verify the hero `h1` is visible
3. Open the language dropdown in the header and select "English"
4. Verify hero text and CV link switch to English
5. Reload the page

### Expected Result:
- Hero heading visible on first load
- After switching: heading contains "If you can think it", CV link points to `/hoja-de-vida-en.pdf`
- After reload: content remains in English (localStorage persistence)

### Key verification points:
- `getByRole("heading", { level: 1 })` visible and translated
- CV link `href` follows the active language

### Notes:
- The hero heading uses a type animation; assertions target the stable
  prefix of the sentence, never the animated tail.
