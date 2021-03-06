var request = require("request");

const performRequest = (options) => {
    return new Promise((resolve, reject) => {
        request(options,(error, response, body) => {
            if (error) throw new Error(error);   
            resolve(body.members);
        });     
    });
}

exports.getSlackUsersData = ( userRecords ) => {

    let options = {
        method: 'GET',
        url: process.env.SLACK_USERS_LIST_URL,
        qs: { 
            token: process.env.SLACK_BOT_TOKEN
        },
        headers: { 
            'cache-control': 'no-cache' 
        } 
    };

    let allSlackMembers =  performRequest(options);    
    let slackUserData = {};

    allSlackMembers.forEach( member => {
        if( member.profile.first_name != "slackbot" ){
            if( member.is_bot == false ){
                let email  = member.profile.email;
                let userid = member.id;
                slackUserData[email]  = userid;
            }
        }          
    });   
    return slackUserData;
}


