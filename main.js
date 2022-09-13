import puppeteer from 'puppeteer'
import fs from 'fs'

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://ais.usvisa-info.com/es-cl/niv/users/sign_in');

await page.waitForSelector('input[type="email"]')
await page.waitForSelector('input[type="password"]')
await page.type('input[type="email"]', 'mackewinsson@gmail.com', {delay: 200})
await page.type('input[type="password"]', 'Palencia1989', {delay: 200})

await page.click('input[name="policy_confirmed"]')
await page.click('input[type="submit"]')
await page.goto('https://ais.usvisa-info.com/es-cl/niv/schedule/34724450/appointment')
await page.click('input[value="Continuar"]')


page.on('response', async (response)=>{

    let data;
    if(response.url().includes('son?appointments')){

        data = await response.json()
        data.map((el)=> console.log(el))
        const bufferData = JSON.stringify(data)
        fs.writeFile("output.json", bufferData, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
         
            console.log("JSON file has been saved.");
        });
        
    }
})





})();