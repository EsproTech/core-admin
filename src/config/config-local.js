module.exports = {
    NODE_ENV: 'dev',
    ENV:{
        dev:{
            PORT: 3000,
            KEY_TOKEN: '*0p3nb0td3v*',
            KEY:'0p3nb0tD3v4PP2021104P1',
            DB: {
                database:'postgres',
                username:'postgres',
                password:'2021',
                opts:{
                    'host':'localhost',
                    'dialect':'postgres',
                    'pool':{
                        max:1000,
                        min:0,
                        require:3000,
                        idle:1000
                    }
                    }
                }
            }
        }
}