const development={
    name:'development',
    asset_path:'/assets',
    session_key_secret:'GauravisProCoder',
    db_name:'myntra',
    google_clientID:'281491999650-on62btf8mcamtkgr1m2h4cde5k2p2h57.apps.googleusercontent.com',
    google_clientSecret:'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',
    google_callbackURL:'http://localhost:8000/callback',
}

const production={
    name:'production',
    asset_path:process.env.ASSET_PATH,
    session_key_secret:process.env.SESSION_KEY_SECRET,
    db_name:process.env.DB_NAME,
    google_clientID:process.env.GOOGLE_CLIENTID,
    google_clientSecret:process.env.GOOGLE_CLIENTSECRET,
    google_callbackURL:process.env.GOOGLE_CALLBACKURL,
}

// console.log(process.env.NODE_ENV);
module.exports= (eval(process.env.NODE_ENV)==undefined)?development:eval(process.env.NODE_ENV);