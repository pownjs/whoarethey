const { Scheduler } = require('@pown/request/lib/scheduler')
const { eachOfLimit } = require('@pown/async/lib/eachOfLimit')

const db = require('./db')

const scheduler = new Scheduler()

class WhoAreThey {
    constructor(options) {
        const { maxConcurrent = 50 } = options || {}

        this.maxConcurrent = maxConcurrent

        this.headers = {
            'User-Agent': 'Pown'
        }
    }

    buildTransaction(account, site) {
        return { method: 'GET', uri: site.check_uri.replace('{account}', account), headers: { ...this.headers, ...site.check_headers }, timeout: 10000, site, account }
    }

    * generateTransactions(account, filter) {
        const { categories = [] } = filter || {}

        const { sites } = db

        for (const site of sites) {
            const { valid, category } = site

            if (!valid) {
                continue
            }

            if (categories.length && !categories.includes(category)) {
                continue
            }

            yield this.buildTransaction(account, site)
        }
    }

    accountExists(site, response) {
        const { account_existence_code, account_existence_string, account_missing_code, account_missing_string } = site

        const { responseCode, responseBody } = response

        const responseBodyString = responseBody.toString()

        const aec = !account_existence_code ? false : Array.isArray(account_existence_code) ? account_existence_code : [account_existence_code]
        const aes = !account_existence_string ? false : Array.isArray(account_existence_string) ? account_existence_string : [account_existence_string]

        const amc = !account_missing_code ? false : Array.isArray(account_missing_code) ? account_missing_code : [account_missing_code]
        const ams = !account_missing_string ? false : Array.isArray(account_missing_string) ? account_missing_string : [account_missing_string]

        if (aec && !aec.some(c => responseCode == c)) {
            return false
        }

        if (aes && !aes.some(s => responseBodyString.indexOf(s) >= 0)) {
            return false
        }

        if (amc && !!amc.some(c => responseCode == c)) {
            return false
        }

        if (ams && !!ams.some(s => responseBodyString.indexOf(s) >= 0)) {
            return false
        }

        return true
    }

    async fingerprint(account, filter) {
        const results = []

        await eachOfLimit(this.generateTransactions(account, filter), this.maxConcurrent, async({ site, ...req }) => {
            const { name, category, pretty_uri } = site

            if (process.env.POWN_DEBUG) {
                console.debug(`checking account at ${req.uri}`)
            }

            const { uri, ...res } = await scheduler.request(req)

            if (this.accountExists(site, res)) {
                const prettyUri = pretty_uri ? pretty_uri.replace('{account}', account) : uri

                if (process.env.POWN_DEBUG) {
                    console.debug(`account found at ${uri} <-> ${prettyUri}`)
                }

                results.push({ name, category, uri, prettyUri })
            }
        })

        return results
    }
}

module.exports = { WhoAreThey }
