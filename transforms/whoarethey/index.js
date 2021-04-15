const { Transform } = require('@pown/recon/lib/transform')
const { NICK_TYPE, BRAND_TYPE } = require('@pown/recon/lib/types')

const { WhoAreThey } = require('../../lib/whoarethey')

const WHOARETHEY_ACCOUNT_TYPE = 'whoarethey:account'

const whoaretheyReport = class extends Transform {
    static get alias() {
        return ['whoarethey_report', 'whoarethey', 'wmnr', 'wmn']
    }

    static get title() {
        return 'WhoAreThey Report'
    }

    static get description() {
        return 'Find social accounts with the help of the whoarethey database.'
    }

    static get group() {
        return this.title
    }

    static get tags() {
        return ['ce']
    }

    static get types() {
        return [NICK_TYPE, BRAND_TYPE]
    }

    static get options() {
        return {
            categories: {
                description: 'Categories to narrow down searches to',
                type: "array",
                default: []
            }
        }
    }

    static get priority() {
        return 1
    }

    static get noise() {
        return 5
    }

    async handle({ id: source = '', label = '' }, options) {
        const { categories } = options

        const results = []

        const w = new WhoAreThey({ database: require('@pown/whoarethey/lib/database'), scheduler: this.scheduler })

        for (let { name, category, url: detectionUri, prettyUri: uri } of await w.fingerprint(label, { categories })) {
            results.push({ type: WHOARETHEY_ACCOUNT_TYPE, label: `${label}@${name}`, props: { category, uri, detectionUri }, edges: [source] })
        }

        return results
    }
}

module.exports = { whoaretheyReport }
