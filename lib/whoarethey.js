const { eachOfLimit } = require('@pown/async/lib/eachOfLimit')

class WhoAreThey {
    constructor(options) {
        const { database, scheduler, concurrency = Infinity } = options || {}

        this.database = database
        this.scheduler = scheduler
        this.concurrency = concurrency
    }

    * buildTransaction(accounts, site) {
        const { check_uri, check_headers } = site

        if (!Array.isArray(accounts)) {
            accounts = [accounts]
        }

        for (let account of accounts) {
            yield { method: 'GET', uri: check_uri.replace('{account}', account), headers: check_headers, info: { site, account } }
        }
    }

    * generateTransactions(accounts, filter) {
        const { categories = [] } = filter || {}

        const { sites } = this.database

        for (const site of sites) {
            const { valid, category } = site

            if (!valid) {
                continue
            }

            if (categories.length && !categories.includes(category)) {
                continue
            }

            yield* this.buildTransaction(accounts, site)
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

    async fingerprint(accounts, filter) {
        const results = []

        await eachOfLimit(this.generateTransactions(accounts, filter), this.concurrency, async({ info, ...req }) => {
            const { site, account } = info
            const { name, category, pretty_uri } = site

            console.debug(`checking account at ${req.uri}`)

            const { uri, ...res } = await this.scheduler.request(req)

            if (this.accountExists(site, res)) {
                const prettyUri = pretty_uri ? pretty_uri.replace('{account}', account) : uri

                console.debug(`account found at ${uri} -> ${prettyUri}`)

                results.push({ name, category, uri, prettyUri })
            }
        })

        return results
    }
}

module.exports = { WhoAreThey }
