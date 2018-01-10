import { HackyUiPage } from './app.po';

describe('hacky-ui App', () => {
  let page: HackyUiPage;

  beforeEach(() => {
    page = new HackyUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
