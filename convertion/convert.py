"""
This module convert the text file data into json format like below
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
"""
import json


filename = "freebusy.txt"
# stores all the text data in the form of json in the variable
employee_details = []
# Stores index of line where the employee names contains in the given data
index_of_emp_names = []

def convert24(time):
      
    # Checking if last two elements of time
    # is AM and first two elements are 12
    if time[-2:] == "AM" and time[:2] == "12":
        return "00" + time[2:-2]
          
    # remove the AM    
    elif time[-2:] == "AM":
        return time[:-6]
      
    # Checking if last two elements of time
    # is PM and first two elements are 12   
    elif time[-2:] == "PM" and time[:2] == "12":
        return time[:-6]
          
    else: 
        # add 12 to hours and remove PM
        splited_Time = list(time[:-2].split(":"))
        # after_hour = 
        return str(int(splited_Time[0]) + 12)+":"+splited_Time[1]


def split_meeting_details(meeting_data: str):
    """
    This module format given meeting data into dict
    {
        "date": "",
        "time": "24 Format",
    }
    """
    meeting = {}
    metting_d_t = list(meeting_data.split(" ", 1))
    meeting["date"] = metting_d_t[0]
    meeting["time"] = convert24(metting_d_t[1])
    return meeting


def check_id_presents(id: str):
    """
    This module checks whether employee id present in the employee_details
    variable or not
    """
    for each_index in range(len(employee_details)):
        if employee_details[each_index]["id"] == id:
            return [True, each_index]
        else:
            continue
    return [False, None]


# opens the given text file and read the data, and reformat the data into
# new json file
with open(filename, "r") as read:
    data = read.readlines()
    for index in range(len(data)):

        # variables
        each_employee = {}  # each employee details format intto dict
        meetings = []  # stores list of each employee meeting details
        each_meeting = {}  # employee each metting details format into dict

        # break this iteration if the line is empty
        if not data[index].strip() == "":
            each = list(data[index].split(";"))

            # if the line contains names of employees and data is empty go to else block
            if not each[1][0].isalpha() and not each[1].strip() == "":

                # in some points given meeting times has missing values
                if len(list(each[1].split())) == 3 and len(list(each[2].split())) == 3:
                    each_meeting["start"] = split_meeting_details(each[1])
                    each_meeting["end"] = split_meeting_details(each[2])

                    # Here it will chceck whether the present meeting data belongs to the employee already
                    # exist in the dictonary. If exist then append the meeting times to particular emp in
                    # the dictionary
                    is_present = check_id_presents(each[0])
                    if is_present[0] == True:
                        employee_details[is_present[1]
                                         ]["meetings"].append(each_meeting)
                    else:
                        each_employee["id"] = each[0]
                        each_employee["name"] = ""
                        meetings.append(each_meeting)
                        each_employee["meetings"] = meetings
                        employee_details.append(each_employee)
                else:
                    continue
            # stores all the index of lines where the employee names contians
            elif not each[1].strip() == "":
                index_of_emp_names.append(index)

# read the names of the employee and add their names to the respective ids in the dictionary
with open(filename, "r") as read:
    data = read.readlines()
    for index_each_employee in index_of_emp_names:
        each_employee_info = list(data[index_each_employee].split(";"))

        # find the index of each employee id's and add their names
        is_present = check_id_presents(each_employee_info[0])
        if is_present[0] == True:
            employee_details[is_present[1]
                             ]["name"] = each_employee_info[1].rstrip()


# convert the dictonary into json file
out_file = open("employees.json", "w")
json.dump(employee_details, out_file, sort_keys=False, indent=4)
out_file.close()
