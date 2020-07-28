const assert = require('assert')
const { Scheduler } = require('@pown/request/lib/scheduler')
const { eachOfLimit } = require('@pown/async/lib/eachOfLimit')

const db = require('../lib/db')
const { WhoAreThey } = require('../lib/whoarethey')

describe('whatsmyname', () => {
    describe('db', () => {
        for (const site of db.sites) {
            const { name, known_accounts = [], valid = false } = site

            if (!valid) {
                continue
            }

            it(`must checkout ${site.name}`, async() => {
                const wt = new WhoAreThey()

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
