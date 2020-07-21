import { AppPage } from "e2e/src/pages/app.po";


describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should have <router-outlet> present", () => {
    page.navigateTo();
    expect(page.getRouter().isPresent()).toBe(true);
  });

  it("should display Helix UI", () => {
    page.navigateTo();
    expect(page.getHelixNavCssClass()).toBe("hxNav");
  });  
});
