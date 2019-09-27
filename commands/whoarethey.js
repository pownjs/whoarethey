exports.yargs = {
    command: 'whoarethey <accounts...>',
    describe: 'find social networking accounts and more',

    builder: {
        concurrency: {
            describe: 'Number of concurrent requests',
            type: 'number',
            default: 100,
            alias: 'c'
        },

        categories: {
            describe: 'Only use selected categories',
            type: 'array',
            default: [],
            alias: 't'
        }
    },

    handler: async(argv) => {
        const { concurrency, categories, accounts } = argv

        const { WhoAreThey } = require('../lib/whoarethey')

        const w = new WhoAreThey({ maxConcurrent: concurrency })

        w.on('log', console.log)
        w.on('info', console.info)
        w.on('warn', console.warn)
        w.on('error', console.error)
        w.on('debug', console.debug)

        for (const account of accounts) {
            const results = await w.fingerprint(account, { categories })

            console.table(results)
        }
    }
}
