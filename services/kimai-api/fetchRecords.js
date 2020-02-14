const request = require("request");
const getDates     = require('../../utils/getDates')
require('dotenv').config()

const xauthtoken = process.env.X_AUTH_TOKEN;
const xauthuser  = process.env.X_AUTH_USER;    

let options = { 
    method: 'GET',
    headers: 
    { 
        'cache-control': 'no-cache',
        'x-auth-token': xauthtoken,
        'x-auth-user': xauthuser 
    }
};

const performRequest = (options) => {
    return new Promise((resolve, reject) => {
        request(options,(error, response, body) => {
            if (error) throw new Error(error);   
            resolve(body);
        });     
    });
}
  
exports.getUsers = async () => {
    options.url = process.env.USER_RECORDS_URL;
    let result =  performRequest(options);    
    return result;      
}

exports.getTimeSheetRecords = async (command) => {
    const Dates = getDates.getDates(command);
    options.url = process.env.TIMESHEET_RECORDS_URL;
    options.qs  = {
        begin: Dates.beginDate,
        end : Dates.endDate 
    }    
    let result =  await performRequest(options);    
    return result;
}
