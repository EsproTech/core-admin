module.exports = {
    NODE_ENV: 'dev',
    ENV: {
        dev: {
            PORT: 3001,
            KEY_TOKEN: '*3spr0t3ch*',
            KEY: '3spr0t3chW3B',
            DB: {
                database: 'desarrollo',
                username: 'esprotech',
                password: '3spr0t3ch',
                opts: {
                    'host': '127.0.0.1',
                    'dialect': 'postgres',
                    'port': 5433,
                    'pool': {
                        max: 1000,
                        min: 0,
                        require: 3000,
                        idle: 1000
                    }
                }
            }
        }
    }
}