const hashmap    = require('hashmap');
const { INDEX_0, INDEX_1,INITIAL_HOURS,HOUR_INDEX } = require('../../constants')

const initialiseUserMap = (userRecords) => {
    let map = new hashmap();
    userRecords.forEach( user => {
        let userdata = [];
        userdata.push(user.username);
        userdata.push( INITIAL_HOURS );        
        map.set(user.id,userdata);
    });
    return map;
}

exports.getTotalNoOfHours = (timesheetRecords, userRecords) => {
    let userMap = initialiseUserMap(userRecords);  
    
    timesheetRecords.forEach( record  => {
        let userdata = userMap.get(record.user);
        let prevHours = parseFloat(userdata[ INDEX_1 ]); 
        let currentHours = record.duration / 3600;
        userdata[ HOUR_INDEX ] = (prevHours + currentHours).toPrecision(3);
        userMap.set(record.user,userdata);
    });    

    let result = []
    userMap.forEach( user => {
        result.push(
          { 
            'username':user[ INDEX_0  ],
            'totalhours':user[ INDEX_1 ] 
          } 
        ) 
    });
    return result;
 }
