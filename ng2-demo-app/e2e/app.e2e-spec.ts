import { Ng2DemoAppPage } from './app.po';

describe('ng2-demo-app App', () => {
  let page: Ng2DemoAppPage;

  beforeEach(() => {
    page = new Ng2DemoAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
