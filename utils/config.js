var config = {
    server:'RAHUL',
    port:1433,    
    database:'NSKD',  
    user: 'Rahul Sahu',
    password: 'Admin',      
    options:{
        enableArithAbort :true,
        trustedConnection:true,
        trustServerCertificate: true
    },
    connectionTimeout:150000,
    pool:{
        max:10,
        min:0,
        idleTimeoutMillis:30000
    }    
}

module.exports = config