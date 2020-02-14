const getRecords = require('../services/kimai-api/fetchRecords');
const getTotalNoOfHours   = require('../services/employee/countWorkingHours');
const stringConverterHelper = require('../utils/stringConverterHelper');
const { body } = require('express-validator/check')
const { validationResult } = require('express-validator/check');
const { INDEX_0, INDEX_1,UNPROCESSABLE_ENTITY } = require('../constants');

exports.validate = ( method ) => {    
    switch (method) {
        case 'countWorkingHours': {
            return [ 
                body('command', ' command doesnt exists ').not().isEmpty()
            ]   
        }
    }
}

exports.countWorkingHours = async ( req,res ) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        res.status(UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
        return;
    }

    const { body: { command } } = req;   

    const timesheetRecordsPromise = getRecords.getTimeSheetRecords(command);    
    const userRecordsPromise      = getRecords.getUsers(); 
    const records = await Promise.all([timesheetRecordsPromise, userRecordsPromise]);
    //console.log(records[0]);    
    let result    = await getTotalNoOfHours.getTotalNoOfHours(JSON.parse(records[ INDEX_0 ]),JSON.parse(records[ INDEX_1 ]));    
    const stringResult =  stringConverterHelper.getWorkingHoursIntoString(result);    
    res.send(stringResult);
}