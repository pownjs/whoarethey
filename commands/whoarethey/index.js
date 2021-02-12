exports.yargs = {
    command: 'whoarethey <accounts...>',
    describe: 'find social networking accounts and more',
    aliases: ['whothey', 'who'],

    builder: {
        concurrency: {
            describe: 'Number of concurrent requests',
            type: 'number',
            default: 100,
            alias: ['c']
        },

        categories: {
            describe: 'Only use selected categories',
            type: 'array',
            default: [],
            alias: ['t']
        },

        outputFormat: {
            describe: 'Output format for results',
            type: 'string',
            default: 'table',
            alias: ['o', 'output'],
            choices: ['table', 'json', 'url']
        }
    },

    handler: async(argv) => {
        const { concurrency, categories, outputFormat, accounts } = argv

        const { WhoAreThey } = require('../../lib/whoarethey')

        const w = new WhoAreThey({ maxConcurrent: concurrency })

        for (const account of accounts) {
            const results = await w.fingerprint(account, { categories })

            if (outputFormat === 'table') {
                console.table(results)
            }
            else
            if (outputFormat === 'json') {
                console.log(JSON.stringify(results))
            }
            else
            if (outputFormat === 'url') {
                results.forEach(({ prettyUri }) => console.log(prettyUri))
            }
            else {
                throw new Error(`Unexepcted state`)
            }
        }
    }
}
