import { Angular2DatatablesPage } from './app.po';

describe('angular2-datatables App', function() {
  let page: Angular2DatatablesPage;

  beforeEach(() => {
    page = new Angular2DatatablesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
