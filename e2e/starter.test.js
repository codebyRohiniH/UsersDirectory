describe('UsersDirectory E2E', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

 

  describe('Home Screen', () => {
    it('should show the home screen with users list after loading', async () => {
      // GIVEN the app has launched
      // WHEN we wait for the initial load to finish
      await waitFor(element(by.id('home-screen'))).toBeVisible();
      // THEN the users list should be visible
      await waitFor(element(by.id('users-list'))).toBeVisible();
    });

    it('should allow typing in the search input', async () => {
      // GIVEN the home screen has loaded
      await waitFor(element(by.id('home-screen'))).toBeVisible();
      await waitFor(element(by.id('search-input'))).toBeVisible();
      // WHEN we tap and type in the search input
      await element(by.id('search-input')).tap();
      await element(by.id('search-input')).typeText('Emily');
      // THEN the users list should still be visible (showing results or empty state)
      await waitFor(element(by.id('users-list'))).toBeVisible();
      // Clean up: clear text for subsequent tests
      await element(by.id('search-input')).clearText();
    });
  });

  describe('Navigation to Detail Screen', () => {
    it('should navigate to user detail when tapping a user', async () => {
      // GIVEN the home screen is loaded with users
      await waitFor(element(by.id('home-screen'))).toBeVisible();
      await waitFor(element(by.id('user-item-1'))).toBeVisible();
      // WHEN we tap the first user
      await element(by.id('user-item-1')).tap();
      // THEN the detail screen should appear
      await waitFor(element(by.id('detail-screen'))).toBeVisible();
    });
   
  });

  describe('Detail Screen Interactions', () => {
    beforeAll(async () => {
      // Ensure we are on the detail screen before running these tests
      await waitFor(element(by.id('home-screen'))).toBeVisible();
      await waitFor(element(by.id('user-item-1'))).toBeVisible();
      await element(by.id('user-item-1')).tap();
      await waitFor(element(by.id('detail-screen'))).toBeVisible();
    });

    it('should keep avatar visible after tapping bounce button', async () => {
      // GIVEN the detail screen is visible
      await waitFor(element(by.id('detail-avatar'))).toBeVisible();
      await waitFor(element(by.id('bounce-avatar-button'))).toBeVisible();
      // WHEN we tap the bounce avatar button
      await element(by.id('bounce-avatar-button')).tap();
      // THEN the avatar should still be visible
      await waitFor(element(by.id('detail-avatar'))).toBeVisible();
    });
  });
});
