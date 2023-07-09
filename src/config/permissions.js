module.exports = {
    ANNONIMUS:{
        'GET':['/v1/community', '/v1/community/ID','/v1/community/types/ID','/v1/community/search', 
            '/v1/user/ID', '/v1/auth/validateToken', '/v1/country', '/v1/country/ID',
            '/v1/state', '/v1/state/ID', '/v1/address/ID', '/v1/locality','/v1/locality/ID', 
            '/v1/municipality', '/v1/municipality/ID', '/v1/community/user'],
        'POST':['/v1/auth/signIn','/v1/auth/logIn','/v1/community',
            '/v1/community/user', '/v1/auth/change/password', '/v1/address'],
        'PUT':['/v1/user','/v1/address/ID'],
        'DELETE': ['/v1/community/user/delete/ID']
    },
    CLIENTE:{
        'GET': [
            '/v1/space/community/ID','/v1/card', '/v1/card/ID',
            '/v1/shift/available','/v1/access', '/v1/access/ID', 
            '/v1/companion', '/v1/companion/ID',
            '/v1/space', '/v1/space/ID', '/v1/access/next', '/v1/access/previous',
            '/v1/access/generate/entrykey', '/v1/access/check/entry/ID',
            '/v1/access/communitary/ID', '/v1/access/reservation/curentdate',
            '/v1/mp', '/v1/mp/ID', '/v1/shift', '/v1/shift/ID', '/v1/shift/space/ID', 
            '/v1/companion/access/ID', '/v1/companion/recent', '/v1/space/reservables', '/v1/space/available'],
        'POST': ['/v1/card','/v1/access', '/v1/companion', 
            '/v1/access/payment', '/v1/mp'],
        'PUT': ['/v1/user', '/v1/card/ID', '/v1/access', '/v1/companion',
            '/v1/mp/ID'],
        'DELETE': ['/v1/companion/ID', '/v1/card/ID']
    },
    SEGURIDAD:{
        'GET': ['/v1/space/community/ID', '/v1/card', '/v1/card/ID',
            '/v1/shift/available', '/v1/access', '/v1/access/ID', '/v1/companion',
            '/v1/companion/ID', '/v1/space', '/v1/space/ID',
            '/v1/access/previous','/v1/access/next', '/v1/access/generate/entrykey', '/v1/access/check/entry/ID',
            '/v1/access/communitary/ID', '/v1/access/reservation/curentdate',
            '/v1/mp', '/v1/mp/ID', '/v1/shift', '/v1/shift/ID', '/v1/shift/space/ID', 
            '/v1/companion/access/ID','/v1/companion/recent', '/v1/space/reservables', '/v1/space/available'],
        'POST': ['/v1/card','/v1/access', '/v1/companion', '/v1/access/payment', '/v1/mp'],
        'PUT': ['/v1/user', '/v1/card/ID', '/v1/access/ID', '/v1/companion/ID', '/v1/mp/ID'],
        'DELETE': ['/v1/card/ID', '/v1/companion/ID']
    },
    ADMINISTRADOR:{
        'GET': [
            '/v1/space/community/ID', '/v1/user', '/v1/user/manager/spaces/ID', 
            '/v1/user/search', '/v1/user/privileged', '/v1/card', '/v1/card/ID',
            '/v1/shift/available', '/v1/access','/v1/companion', '/v1/companion/ID', '/v1/space', 
            '/v1/space/ID', '/v1/shift', '/v1/shift/ID', '/v1/access/next', '/v1/access/previous', 
            '/v1/access/generate/entrykey', '/v1/access/check/entry/ID', '/v1/access/communitary/ID', 
            '/v1/access/reservation/curentdate', '/v1/mp', '/v1/mp/ID', '/v1/shift/space/ID',
            '/v1/companion/access/ID', '/v1/companion/recent', '/v1/space/reservables', '/v1/space/available'],
        'POST': ['/v1/user/privileged', '/v1/card','/v1/access', '/v1/companion', 
            '/v1/shift', '/v1/access/payment', '/v1/mp', '/v1/companion/partner'],
        'PUT': ['/v1/user', '/v1/community', '/v1/companion/ID', '/v1/access','/v1/space', 
            '/v1/shift', '/v1/card/ID', '/v1/mp/ID'],
        'DELETE': ['/v1/user/privileged/ID', '/v1/shift/ID', 
            '/v1/access/ID', '/v1/card/ID', '/v1/companion/ID']
    },
    CONFIGURATION:{
        'POST': ['/v1/country', '/v1/state', '/v1/locality', '/v1/municipality', '/v1/configuration', '/v1/plan'],
        'PUT': ['/v1/country', '/v1/state', '/v1/locality', '/v1/municipality', '/v1/configuration', '/v1/plan'],
        'DELETE': ['/v1/country', '/v1/state', '/v1/locality', '/v1/municipality', '/v1/configuration', '/v1/plan']
    }
}