import { LvmLoggingPage } from './app.po';

describe('lvm-logging App', function() {
  let page: LvmLoggingPage;

  beforeEach(() => {
    page = new LvmLoggingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Logger Configuration Page');
  });
});
