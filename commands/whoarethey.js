exports.yargs = {
    command: 'whoarethey <accounts...>',
    describe: 'find social networking accounts and more',

    builder: {
        concurrency: {
            describe: 'Number of concurrent requests',
            type: 'number',
            default: 50,
            alias: 'c'
        }
    },

    handler: async(argv) => {
        const { concurrency, accounts } = argv

        const { WhoAreThey } = require('../lib/whoarethey')

        const w = new WhoAreThey({ maxConcurrent: concurrency })

        w.on('log', console.log)
        w.on('info', console.info)
        w.on('warn', console.warn)
        w.on('error', console.error)

        for (const account of accounts) {
            const results = await w.fingerprint(account)

            console.table(results)
        }
    }
}
