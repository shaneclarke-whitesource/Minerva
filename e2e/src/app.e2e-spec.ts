import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Rackspace Intelligence');
  });

  it('should display Helix UI', () => {
    page.navigateTo();
    expect(page.getHelixNavCssClass()).toBe('hxNav');
  });
});
