const getRecords = require('../services/kimai-api/fetchRecords');
const emptyDescriptionService = require('../services/timesheet/emptyDescription');
const missingRecordsService = require('../services/timesheet/missingRecords');
const stringConverterHelper = require('../utils/stringConverterHelper');
const getTimeOfCommand      = require('../utils/getTimeOfCommand');
const { body } = require('express-validator/check');
const { validationResult } = require('express-validator/check');
const { INDEX_0, INDEX_1 } = require('../constants')

exports.validate = ( method ) => {    
    switch (method) {
        case 'getTimesheetMissingRecords': {
            return [ 
                body('command', ' command doesnt exists ').not().isEmpty()
            ]   
        }
        break;
        case 'getTimesheetMissingDescription':{
            return [ 
                body('command', ' command doesnt exists ').not().isEmpty()
            ]   
        }
    }
}

exports.getTimesheetMissingDescription = async ( req,res ) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    const { body: { command } } = req;   
    const timesheetRecordsPromise = getRecords.getTimeSheetRecords(command);
    const userRecordsPromise      = getRecords.getUsers(); 
    const records = await Promise.all([timesheetRecordsPromise, userRecordsPromise]);
    let result    = await emptyDescriptionService.getEmptyDescriptionUsers(JSON.parse(records[ INDEX_0 ]),JSON.parse(records[ INDEX_1 ]));
    const stringResult = stringConverterHelper.getMissingDescriptionIntoString(result);
    res.send(stringResult);
}

exports.getTimesheetMissingRecords = async ( req,res ) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    const { body: { command } } = req;   
    const days = getTimeOfCommand.getTimeOfCommand(command);
    const timesheetRecordsPromise = getRecords.getTimeSheetRecords(command);
    const userRecordsPromise      = getRecords.getUsers(); 
    const records = await Promise.all([timesheetRecordsPromise, userRecordsPromise]);
    let result    = await missingRecordsService.getMissingRecords(JSON.parse(records[ INDEX_0 ]),JSON.parse(records[ INDEX_1 ]), days );
    const stringResult = stringConverterHelper.getMissingRecordsIntoString(result);
    res.send(stringResult);
}


