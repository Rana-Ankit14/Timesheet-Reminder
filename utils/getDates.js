let moment = require('moment');
const Constants = require('../constants');
let getTimeOfCommand = require('../utils/getTimeOfCommand');

exports.getDates = (command) => {
    let commandTime = getTimeOfCommand.getTimeOfCommand(command);
    let yesterday  = moment().subtract(1,'days').endOf('day');    
    let endDate    = yesterday.format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).toString();

    let endDateMinusOneDay = yesterday.subtract(1,'day').startOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).toString();
    let endDateMinusOneWeek = yesterday.subtract(1,'week').startOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).toString();
    let endDateMinusOneMonth = yesterday.subtract(1,'month').startOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).toString();

    let beginDate = endDateMinusOneDay;
    if( commandTime ==  Constants.WEEK_KEYWORD ){
        beginDate = endDateMinusOneWeek;
    }
    else if( commandTime == Constants.MONTH_KEYWORD ){
        beginDate = endDateMinusOneMonth;
    }
    const Dates = {
        beginDate,
        endDate
    }
    return Dates;
}