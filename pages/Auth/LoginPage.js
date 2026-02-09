// LoginPage represents all login-related actions and locators
export class LoginPage {

  // Constructor receives Playwright's page object
  constructor(page) {
    // Store page reference for reuse across methods
    this.page = page;

    // Locator for LOGIN / REGISTER button (entry point to login)
    this.loginRegisterBtn = page.getByText('LOGIN / REGISTER');

    // Locator for Account (username) input field
    this.accountInput = page.getByRole('textbox', { name: 'Account' });

    // Locator for Password input field
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });

    // Locator for Login button
    this.loginBtn = page.locator('#loginButton');
  }

  // Navigates to the application login URL
  async goto() {
    await this.page.goto('https://dev.partscheck.com.au/global/index.php');
  }

  // Performs login using provided username and password
  async login(username, password) {

    // Open login modal
    await this.loginRegisterBtn.click();

    // Enter username
    await this.accountInput.click();
    await this.accountInput.fill(username);

    // Enter password
    await this.passwordInput.click();
    await this.passwordInput.fill(password);

    // Submit login form
    await this.loginBtn.click();

    // WAIT for post-login navigation to complete
    await this.page.waitForURL(
      /appV2\/welcome\.php|action=dashboard/i,
      { timeout: 15_000 }
    );

     // Handle post-login welcome iframe/modal if present
    await this.handlePostLoginWelcome();
  }
  // Handles the welcome iframe/modal that may appear after login
  async handlePostLoginWelcome() {
    const iframeDialog = this.page.locator('dialog iframe');

    // Only act if iframe exists (defensive handling)
    if (await iframeDialog.count() > 0) {
      // Click outside to dismiss overlay
      await this.page.mouse.click(5, 5);
      // Wait until the dialog is actually dismissed
      await page.locator('dialog').waitFor({ state: 'hidden', timeout: 10_000 });
    }
  }
}
