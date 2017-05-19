import { LvmLoggingPage } from './app.po';

describe('lvm-logging App', function() {
  let page: LvmLoggingPage;

  beforeEach(() => {
    page = new LvmLoggingPage();
  });

  it('should have a h1 section', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toBeTruthy();
  });
});
