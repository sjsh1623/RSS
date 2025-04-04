// ecosystem.config.js
module.exports = {
    apps: [
        {
            name: 'rss-worker',
            script: 'scripts/rssWorker.ts',
            interpreter: 'ts-node',
            watch: false,
        },
    ],
};