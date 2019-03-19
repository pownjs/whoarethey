exports.yargs = {
    command: 'whoarethey <accounts...>',
    describe: 'find social networking accounts and more',

    handler: async(argv) => {
        const { accounts } = argv

        const { WhoAreThey } = require('../whoarethey')

        const w = new WhoAreThey()

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
