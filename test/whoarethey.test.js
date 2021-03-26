const assert = require('assert')
const { Scheduler } = require('@pown/request/lib/scheduler')
const { eachOfLimit } = require('@pown/async/lib/eachOfLimit')

const database = require('../lib/database')
const { WhoAreThey } = require('../lib/whoarethey')

describe('whatsmyname', () => {
    describe('database', () => {
        for (const site of database.sites) {
            const { name, known_accounts = [], valid = false } = site

            if (!valid) {
                continue
            }

            it(`${site.name} validates`, async() => {
                const wt = new WhoAreThey() // TODO: working

                const generateRequests = function*() {
                    for (const account of known_accounts) {
                        yield wt.buildTransaction(account, site)
                    }
                }

                const scheduler = new Scheduler()

                const results = []

                await eachOfLimit(generateRequests(), 10, async({ site, account, ...req }) => {
                    results.push([wt.accountExists(site, await scheduler.request(req)), `${name}:::${account} -> ${req.uri}`])
                })

                for (let [outcome, message] of results) {
                    assert.ok(outcome, message)
                }
            }).timeout(0)
        }
    })
})
