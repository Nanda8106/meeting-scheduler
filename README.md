# Assignment - Meeting Scheduler

## Description:
An application for scheduling meetings for company employees. Each employee's busy schedules were all provided in text form. The assignment's goal is to locate meetings where necessary personnel were available on the requested date and time.

### struture of the folder

Assignment
    - convertion
        - convert.py
        - freebusy.txt
    - schedule-meeting
        - public
        - src
        - package.json
        - package-lock.json
    - README.md

### Explanation

The provided data is in text format and includes some null values. I therefore created a Python script to transform the text data into JSON.

Json file created from the script will be in the form of
[
    {
        "id":"",
        "name:"",
        "mettings": [
            {
                "start":{
                    "date":"",
                    "time":"24 hrs",
                    
                },
                "end":{
                    "date":"",
                    "time":"24 hrs",
                }
            },
            {},....
        ]
    },
]


### Instruction to run the application

1. Clone the assignment from the given link: 
2. As above mentioned these assignment contians two folders convertion, schedule-meeting.
3. Change the directory to schedule-meeting folder where it contains react application.
4. Use the command to install node-modules cmd -> "npm install"
5. Then use the command -> "npm start"
6. Then application will start running. It will take sometime to load

### Input user need to give input in the application

1. name of employees
    - All the employee name suggestion will be given right side when user clicks on the input box
    - After entered the name of employeee, click on the add button to add employee to the searching list.
    - Same names were not allowed
2. Meeting length
    - Intially meeting lenght will be taken 30 min by default
    - There are two button "-, +", every time clicks on "+" increase length by 30 min vice versa
    - Max length of the meeting is only 4 hours.
3. Office hours
    - Here user need to give the infomation about the office working hours.
    - From: it indicates from which time office starts every day.
    - To: It indicates to which time office ends every day.
    - Note: It allow users to give input minutes "00" or "30" because in the test description given "The system handles only handles meetings starts every whole and half hour.
4. Requested start and end date, tim
    - Here user need to give information from when they want to start searching until the end of the date they want to find.
5. Submit
    -After user enters submit button then it will process the information.


    
    