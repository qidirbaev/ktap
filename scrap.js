import puppeteer from 'puppeteer';
import prompt from 'prompt';

const _phone_number = '+998900656909';
const _2x_auth_password = 'Lpq.#81Ma.pl';
const _user_agent = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:96.0) Gecko/20100101 Firefox/96.0';
const GroupName = 'VIRTUAL KITAPXANA';

const clicker = async (page, selector) => {
    await page.waitForSelector(selector);
    await page.click(selector);
};

(async () => {
    // set some options, set headless to false so we can see the browser in action
    let launchOptions = { headless: false, args: ['--start-maximized'] };

    // launch the browser with above options
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    // set viewport and user agent (just in case for nice viewing)
    await page.setViewport({width: 1366, height: 900});
    await page.setUserAgent(_user_agent);

    await page.goto('https://web.telegram.org/z/');

    await page.waitForSelector('.Button.default.primary');

    // page wait
    await page.waitForTimeout(15000);

    // wait for selector
    await page.waitForSelector('.title');
    await page.evaluate(() => {
        const group_names = document.querySelectorAll('.title h3');
        group_names.forEach(group => {
            if (group.innerText.includes(GroupName)) {
                group.click();
            }
        });
    });
    // wait for the button to be clickable
    // await page.waitForSelector('#sign-in-password');
    // await page.type('#sign-in-password', _2x_auth_password);
    // await page.waitForTimeout(10000);
    // await page.evaluate(() => {
    //     document.querySelector('.Button.default.primary.has-ripple').click();
    // });



    // wait for button to load
    // clicker(page, '.Button.default.primary');
    // await page.waitForSelector('#sign-in-phone-number');
    // await page.type('#sign-in-phone-number', _phone_number);

    // // scroll down to the bottom of the page
    // await page.evaluate(() => {
    //     window.scrollTo(0, document.body.scrollHeight);
    // });
    // clicker(page, '.Button.default.primary.text.has-ripple');

    // const { code } = await prompt.get('Enter the code: ');



    // set the HTTP Basic Authentication credential
    // await page.authenticate({'username':'YOUR_BASIC_AUTH_USERNAME', 'password': 'YOUR_BASIC_AUTH_PASSWORD'});

    // go to website that protected with HTTP Basic Authentication
    // await page.goto('https://WEBSITE_THAT_PROTECTED_BY_HTTP_BASIC_AUTH');

    // close the browser
    // await browser.close();
})();
