import { IdeaTrackerPage } from './app.po';

describe('idea-tracker App', function() {
  let page: IdeaTrackerPage;

  beforeEach(() => {
    page = new IdeaTrackerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
