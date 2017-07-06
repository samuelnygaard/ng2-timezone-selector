import { NgDemoAppPage } from './app.po';

describe('ng2-demo-app App', () => {
  let page: NgDemoAppPage;

  beforeEach(() => {
    page = new NgDemoAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
