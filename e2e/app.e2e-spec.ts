import { PastePage } from './app.po';

describe('paste App', function() {
  let page: PastePage;

  beforeEach(() => {
    page = new PastePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
