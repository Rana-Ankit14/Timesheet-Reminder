# Timesheet-Reminder

# Description
  This project reminds daily an user on slack to fill data in KIMAI time-tracking system.<br>

The admin of time-tracking system can easily list down users using SLASH COMMAND on slack.  
  * Who didn't fill timesheet on-time.
  * Forgot to write proper description of work in KIMAI time-tracking system.
  * Count working hours of all employees on daily,weekly,monthly basis.  
  
  
  
# Installing 
  ```
    git clone https://github.com/shadabshaikh0/Timesheet-Reminder.git
    npm install
  ```
  # Configure Slack Account
   ```
    1. https://api.slack.com/apps
    2. Create New App
    3. Fill App Name & Choose your workspace.
    4. Click on OAuth & Permissions Tab, 
       add below permissions to BOT TOKEN SCOPE        
          chat:write
          commands
          incoming-webhook
          reminders:write
          users:read
          users:read.email
          users:write
    5. Copy Bot User OAuth Access Token 
    6. Click on Install App to Workspace
    
    7. Click on Slash Commands Tab,
       Create New Command
       Add all Slack Commands given in slash Commands section    
   ```
   # Slash Commands
   ### Count working hours of employee
    1. /noofhours
       https://timesheet-reminder-1.herokuapp.com/employee/count-working-hours
    2. /noofhours-month
       https://timesheet-reminder-1.herokuapp.com/employee/count-working-hours
    3. /noofhours-week
       https://timesheet-reminder-1.herokuapp.com/employee/count-working-hours
       
   ### Get users who missed timesheet description
    4. /missing-description
       https://timesheet-reminder-1.herokuapp.com/timesheet/missing-description   
    5. /missing-description-week
       https://timesheet-reminder-1.herokuapp.com/timesheet/missing-description   
    6. /missing-description-month
       https://timesheet-reminder-1.herokuapp.com/timesheet/missing-description   
       
   ### Get users who missed timesheet record
    7. /missing-timesheet
       https://timesheet-reminder-1.herokuapp.com/timesheet/missing-records
    8. /missing-timesheet-week
       https://timesheet-reminder-1.herokuapp.com/timesheet/missing-records
    9. /missing-timesheet-month
       https://timesheet-reminder-1.herokuapp.com/timesheet/missing-records
      
      
  # Team
    https://www.linkedin.com/in/shadabshaikh0/    
    https://www.linkedin.com/in/rana-ankit-singh-05028a169/
    https://www.linkedin.com/in/yashveer-bhadouria-1b4805129/

  
