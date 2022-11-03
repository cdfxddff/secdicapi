const puppeteer = require('puppeteer');

const url='https://www.weblio.jp/';

async function search(word) { 
    const browser= await puppeteer.launch({
        headless:true,
        args:[
            '--no-sandbox', 
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
   
    await page.goto(url,{"waitUntil":"domcontentloaded"});
    await page.type('.form-search',word);
    //テキストフォームに入力↑

    //~で始まるをクリック　ナビゲーションを出す
    const aop = await page.$('.btn-search');
    await Promise.all([
        page.waitForNavigation({waitUntil:'domcontentloaded'}),
        aop.click()
    ])
    //クリックしてから画面遷移を待つ

    //要素を取得
    const eletop = await page.$$('#cont > div:nth-child(6) > div > div:nth-child(2) > p');
    let elecoms=[];
    for(let i=0;i<eletop.length;i++){
        elecoms.push(await (await eletop[i].getProperty('textContent')).jsonValue())
    }
    
    await browser.close();
    return elecoms;
}

module.exports={search:search}