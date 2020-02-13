const moment = require('moment');
const { DAILY_KEYWORD,INDEX_0, SATURDAY, SUNDAY } = require('../../constants')
 
const checkPresenceOfUser = ( timesheetRecords, id ) => {
    for( let i=0; i< timesheetRecords.length; i++ ){
        if( timesheetRecords[i].user == id ){
            return true;
        }        
    }
    return false;
}
const getEmptyTimesheetUsers = ( timesheetRecords,userRecords ) => {
    let missingRecords = [];
    userRecords.forEach( user => {
        if( checkPresenceOfUser(  timesheetRecords, user.id  ) === false  ){                       
            missingRecords.push( user.username );            
            return;
        }
    });   
    return missingRecords;
}
exports.getMissingRecords = (timesheetRecords, userRecords, days) => {
    const date = moment();
    let result = [];
    if (days === DAILY_KEYWORD ) {
        result = getEmptyTimesheetUsers(timesheetRecords, userRecords);
        result.sort((a, b) => {
            return a[ INDEX_0 ] - b[ INDEX_0 ];
        });
        result.unshift(date.format('DD-MMMM-YYYY'));
        result = [ result ];
        return result;
    }

    for (let dayIndex = 1; dayIndex <= days; dayIndex++) {
        date.subtract(1, 'days');
        let day = date.day();
        let isWeekend = (day === SATURDAY ) || (day === SUNDAY);

        if( isWeekend == false ) { 

            let currentTimesheetRecords = timesheetRecords.filter( ( record  ) => {
                return moment(record.begin).format('YYYY-MM-DD') === date.format('YYYY-MM-DD');
            });

            let currentMissingRecords = getEmptyTimesheetUsers(currentTimesheetRecords, userRecords);

            currentMissingRecords.sort((a, b) => {
                return a[ INDEX_0 ] - b[ INDEX_0 ]
            });

            currentMissingRecords.unshift(date.format('DD-MMMM-YYYY'))
            result.push(currentMissingRecords);
        }
    }
    return result;
}