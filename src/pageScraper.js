const News = require('./News');




const scraperObject = {
	url: 'https://www.lavozdegalicia.es/santiago/val-do-dubra/index.htm',

	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);

		await page.waitForSelector('main.root.container');
		//
		let items = await page.$$eval('main.root.container article', item => {

			// Extract the links from the data
			// item = item.map(el => el.querySelector('h3 > a').href)
			item = item.map(el => {


				const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

				const parseDate = date => {
					const arr = date.trim().split(" ");

					const month = months.findIndex(mnth => mnth === arr[1])

					// console.log('MES', date);

					return new Date(arr[2], month, arr[0]).toISOString()
				}

				const aaa = parseDate(el.querySelector('.date_pos').textContent)

				const data = {
					title: el.querySelector('h4 > a').textContent,
					excerpt: el.querySelector('p.entradilla')?.textContent || null,
					url: el.querySelector('h4 > a').href,
					featured_image: el.querySelector('img')?.src || null,
					date: aaa,
					medium: "la-voz-de-galicia"
				}


				// const titleElement = el.querySelector('.date_pos')
				// console.log(new Date(el.querySelector('.date_pos').textContent));
				// const excerpt = el.querySelector('p.entradilla') || null

				// console.log('EXCp:', excerpt);

				// const data = {
				// 	image_src: el.querySelector('img')?.src || null,
				// 	title: el.querySelector('h4 > a').textContent ,
				// 	excerpt: el.querySelector('p.entradilla')?.textContent || null,
				// 	url: el.querySelector('h4 > a').href,
				// }
				return data
			})
			return item;
		});


		const pack = items.map(item => new News({...item}).toJson())

		console.log(pack);
	}
}

module.exports = scraperObject;
