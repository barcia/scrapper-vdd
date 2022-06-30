var hash = require('hash.js')

const getCleanUrl = (url) => {
	const data = new URL(url)
	return data.origin + data.pathname
}

class News {
	constructor({title, excerpt, date, url, featured_image, medium}) {

		this.title = title
		this.excerpt = excerpt
		this.date = date
		this.url = getCleanUrl(url)
		this.featured_image = featured_image
		this.medium = medium
		this.id = hash.sha256().update(this.url).digest('hex')


	}

	toJson() {
		return {
			title: this.title,
			excerpt: this.excerpt,
			date: this.date,
			url: this.url,
			featured_image: this.featured_image,
			medium: this.medium,
			id: this.id
		}
	}
}

module.exports = News
