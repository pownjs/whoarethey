exports.yargs = {
    command: 'whoarethey <accounts...>',
    describe: 'find social networking accounts and more',
    aliases: ['whothey', 'who'],

    builder: {
        ...require('@pown/request/commands/request/options/scheduler'),
        ...require('@pown/request/commands/request/options/request'),
        ...require('@pown/request/commands/request/options/output'),
        ...require('@pown/request/commands/request/options/proxy'),

        'task-concurrency': {
            describe: 'Number of concurrent requests',
            type: 'number',
            default: Infinity,
            alias: ['C']
        },

        'categories': {
            describe: 'Only use selected categories',
            type: 'string',
            default: '',
            alias: ['s']
        },

        'output-format': {
            describe: 'Output format for results',
            type: 'string',
            default: 'table',
            alias: [],
            choices: ['table', 'json', 'url']
        }
    },

    handler: async(argv) => {
        const { taskConcurrency, categories, outputFormat, accounts } = argv

        const { Scheduler } = require('@pown/request/lib/scheduler')

        const scheduler = new Scheduler()

        require('@pown/request/commands/request/options/scheduler/handler').init(argv, scheduler)
        require('@pown/request/commands/request/options/request/handler').init(argv, scheduler)
        require('@pown/request/commands/request/options/output/handler').init(argv, scheduler)
        require('@pown/request/commands/request/options/proxy/handler').init(argv, scheduler)

        const { WhoAreThey } = require('../../lib/whoarethey')

        const wrt = new WhoAreThey({ database: require('../../lib/database'), concurrency: taskConcurrency, scheduler })

        const results = await wrt.fingerprint(accounts, { categories: categories.split(/[,\s]+/g).map(c => c.trim()).filter(c => c) })

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
