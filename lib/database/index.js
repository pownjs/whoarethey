const pownjsDb = require('./pownjs.json')
const overrides = require('./overrides.json')
const webbreacherDb = require('./webbreacher.json')

webbreacherDb.sites.forEach((site) => {
    Object.assign(site, overrides[site.name] || {})
})

const db = {
    sites: [].concat(pownjsDb.sites, webbreacherDb.sites)
}

module.exports = db
