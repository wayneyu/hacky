import { HackyUiPage } from './app.po';

describe('hacky-ui App', () => {
  let page: HackyUiPage;

  beforeEach(() => {
    page = new HackyUiPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
