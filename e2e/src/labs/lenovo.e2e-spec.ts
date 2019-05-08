import { $, browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('Search specific model no. in Lenovo site', function () {
  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
  });

  it('should show search model input', async () => {
    await browser.get('https://dcsc.lenovo.com/');

    // 先等 loader 畫面有出來
    await browser.wait(EC.presenceOf(element(by.className('Loader__foreground'))), 10000);

    // 等待 loader 消失，且連結可以被點擊
    const loaderIsOff = EC.stalenessOf(element(by.className('Loader__foreground')));
    const linkIsEnabled = EC.elementToBeClickable(element(by.className('anticon-down')));
    await browser.wait(EC.and(loaderIsOff, linkIsEnabled), 10000);

    await element(
      by.css('div.start-configuration-new-tile.lfo-background')
    ).click();

    const result = await element(
      by.className('ant-select-selection')
    ).isDisplayed();

    expect(result).toEqual(true);
  });

  it('should input the value, click, then navigate.', async () => {
    const currentUrl = await browser.getCurrentUrl();
    '7X06A02'.split('').forEach(async char => {
      await $('.ant-select-search__field').sendKeys(char);
      await browser.sleep(1000);
      await browser.wait(EC.textToBePresentInElementValue($('.ant-select-search__field'), char), 1000);
    });
    await browser.wait(EC.presenceOf(element(by.css('[aria-selected]'))), 5000);
    await element(by.css('[aria-selected]')).click();
    expect(await browser.getCurrentUrl()).not.toBe(currentUrl);
  });
});
