module.exports = {
    NODE_ENV: 'dev',
    ENV:{
        dev:{
            PORT: 3001,
            KEY_TOKEN: '*3spr0t3ch*',
            KEY: '3spr0t3chW3B',
            DB: {
                database: 'desarrollo',
                username: 'esprotech',
                password: '3spr0t3ch',
                opts: {
                    'host': '193.46.198.193',
                    'dialect': 'postgres',
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