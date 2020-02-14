let moment = require('moment');
const Constants = require('../constants');
let getTimeOfCommand = require('../utils/getTimeOfCommand');

exports.getDates = (command) => {
    let commandTime = getTimeOfCommand.getTimeOfCommand(command);
    let endDate     = moment().subtract(1,'day').endOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).toString();
    
    let yesterday  = moment().subtract(1,'day').startOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).toString();    
    let lastWeek = moment().subtract(7,'day').startOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).toString();
    let lastMonth = moment().subtract(28,'day').startOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).toString();

    let beginDate = yesterday;
    if( commandTime ==  Constants.WEEK_KEYWORD ){
        beginDate = lastWeek;
    }
    else if( commandTime == Constants.MONTH_KEYWORD ){
        beginDate = lastMonth;
    }
    
    const Dates = {
        beginDate,
        endDate
    }
    return Dates;
}