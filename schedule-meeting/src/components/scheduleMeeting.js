import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { Puff } from "react-loading-icons";
import employeeData from "../assets/data/employees.json"
import MeetingLength from "./meetingLength";
import OfficeHours from "./officeHours";
import RequestedDate from "./requestedDate";
import { Wrap } from "../assets/style/style";
import EmployeeInputField from "./employeeInputField";


const ScheduleMeeting = ({ setFinalFreeTimes, setSubmitted }) => {
    const [loading, setLoading] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [employeeName, setEmployeeName] = useState("");
    const [resultsFound, setResutlsFound] = useState(true)
    const [officeTimes, setOfficeTimes] = useState({
        from: "",
        to: ""
    })
    const [requestMetting, setRequestMeeting] = useState({
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: ""
    })
    const [error, setError] = useState({
        errorNameMessage: "",
        officeHourseErrors: "",
        requestedDaysErrors: "",
    })
    const [meetingTime, setMeetingTime] = useState(30)

    const { from, to } = officeTimes;
    const { startDate, startTime, endDate, endTime } = requestMetting;
    const { officeHourseErrors, requestedDaysErrors } = error;

    // user functions
    const handleErrors = (errorName, message) => {
        setError({ ...error, [errorName]: message })
    }
    const checkAnyError = () => {
        // when no employee name entered
        if (selectedEmployees.length === 0) {
            handleErrors("errorNameMessage", "* Enter atleast one Employee Name")
            return false
            // when office times not given
        } else if (from === "" || to === "" || officeHourseErrors !== "") {
            handleErrors("officeHourseErrors", "* Enter office From or To hours correctly")
            return false
            // when requested date & time were not given
        } else if (startDate === "" || startTime === "" || endDate === "" || endTime === "" || requestedDaysErrors !== "") {
            handleErrors("requestedDaysErrors", "* Enter all fields and correctly")
            return false
        } else {
            return true
        }
    }


    const checkEmployeeTime = () => {

        // allows submit button when there are no errors
        if (checkAnyError()) {

            // loader will be activated until the process overs
            setLoading(true)

            // function to return wether the date is between the given dates or not
            const isDateBetween = (eachMeeting, start, end) => {
                const date = new Date(eachMeeting["start"]["date"])
                if (date >= start && date <= end) {
                    return eachMeeting
                }
            }

            // function for findinf wether the time in between the given times
            const isTimeBetween = (presentSearchingDate, meetingTiming) => {
                const firstDate = new Date(`${meetingTiming["start"]["date"]} ${meetingTiming["start"]["time"]}`);
                const lastDate = new Date(`${meetingTiming["end"]["date"]} ${meetingTiming["end"]["time"]}`);
                if (presentSearchingDate >= firstDate && presentSearchingDate <= lastDate) {
                    return true
                } else {
                    return false
                }
            }

            // local varibales required throught the whole process
            var start = new Date(startDate);
            var end = new Date(endDate);
            var requestedStartTime = startTime;
            var requestedEndtTime = endTime;
            var officeStart = from;
            var officeEnd = to;
            var lengthMeeting = meetingTime;
            let eachEmpFreeTimes = [] // list of each employee free times

            // finding each employee free time in the requested start and end date, time
            // following loop iterates over each employee given in the field
            for (var eachEmp = 0; eachEmp < selectedEmployees.length; eachEmp++) {
                let meetings = selectedEmployees[eachEmp]["meetings"]
                // finding each employee busy meeting in the given date and time
                let busyMeetings = meetings.filter((meeting) => isDateBetween(meeting, start, end))
                let freeTimes = [] // collects free times of each employee

                // loop to iterate over the requested start date and end date
                for (var day = new Date(`${startDate} ${officeStart}`); day <= new Date(`${endDate} ${officeEnd}`); day.setDate(day.getDate() + 1)) {
                    let presentStartDay = day
                    let presentEndDay = new Date(`${day.toLocaleDateString()} ${officeEnd}`)

                    // Since the requested starting time and the office start time are different, it will check and begin to start checking
                    // at the requested starting time on the first day and ending day time also vice versa.
                    if (day.toLocaleDateString() === start.toLocaleDateString() && day < new Date(`${startDate} ${requestedStartTime}`)) {
                        presentStartDay = new Date(`${startDate} ${requestedStartTime}`)
                    } else if (day.toLocaleDateString() === end.toLocaleDateString() && presentEndDay > new Date(`${endDate} ${requestedEndtTime}`)) {
                        presentEndDay = new Date(`${endDate} ${requestedEndtTime}`)
                    }

                    // total minutes in the working day
                    let totalMinutes = (presentEndDay - presentStartDay) / 60000;

                    // iterates over the minutes based on the meeting length and if the employee is free at the given time
                    // it will gather that information 
                    for (var minute = 0; minute < totalMinutes; minute += lengthMeeting) {
                        let isEmployeeFree = true
                        for (var i = 0; i < busyMeetings.length; i++) {
                            if (isTimeBetween(presentStartDay, busyMeetings[i])) {
                                isEmployeeFree = false
                                break
                            }
                        }
                        if (isEmployeeFree) {
                            freeTimes.push(presentStartDay.toLocaleString())
                        }
                        // increasing over meeting lenght min for every iteration
                        presentStartDay = new Date(presentStartDay.getTime() + lengthMeeting * 60000)
                    }
                }

                eachEmpFreeTimes.push(freeTimes) // all the free time of each employee
            }

            // checking common free times in the gather free times of every employee
            var commonFreeTimes = eachEmpFreeTimes.shift().filter(function (v) {
                return eachEmpFreeTimes.every(function (a) {
                    return a.indexOf(v) !== -1;
                });
            });

            if (commonFreeTimes.length === 0) {
                setResutlsFound(false)
                setFinalFreeTimes([])
            } else {
                setResutlsFound(true)
                setFinalFreeTimes(commonFreeTimes)
            }
            setLoading(false)
        }
        else{
            setResutlsFound(true)
        }
    }

    return (
        <Wrap>
            <Header>
                <h3>Create a Schedule</h3>
                <FontAwesomeIcon className="skip-left" size="2x" icon={faCalendarWeek} />
            </Header>
            <EmployeeInputField
                selectedEmployees={selectedEmployees}
                setSelectedEmployees={setSelectedEmployees}
                employeeName={employeeName}
                setEmployeeName={setEmployeeName}
                error={error}
                setError={setError}
                data={employeeData}
            />
            <TimmingsWrap>
                <MeetingLength
                    meetingTime={meetingTime}
                    setMeetingTime={setMeetingTime}
                />
                <OfficeHours
                    officeTimes={officeTimes}
                    setOfficeTimes={setOfficeTimes}
                    error={error}
                    setError={setError}
                />
            </TimmingsWrap>
            <RequestedDate
                error={error}
                setError={setError}
                requestMetting={requestMetting}
                setRequestMeeting={setRequestMeeting} />
            <Submit>
                <button disabled={loading} onClick={checkEmployeeTime}>Submit</button>
                {loading === true && (<Puff className="loader" height={"1.5em"} strokeWidth={"5px"} stroke="#000000" />)}
            </Submit>
            {resultsFound === false && (
                <NotFound>
                    Results Not found 🥲
                </NotFound>
            )}
        </Wrap>

    )
}

const NotFound = styled.div`
    width: 100%;
    font-size: 2rem;
    margin-top: 2rem;
    text-align: center;
`

const Submit = styled.div`
    width: 100%;
    margin:0 auto;
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    align-items: center;
    button{
        padding: 0.7rem 5rem;
        outline: none;
        border: none;
        background: #F06F19;
        border-radius: 0.3rem;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease-out;
        &:hover{
            background: #ef7f35;
        }
    }
    .loader{
        position: relative;
        left: -50px;
    }
`
const TimmingsWrap = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 46% 46%;
    gap: 8%;
    margin: auto;
    @media (max-width: 830px) {
        display: block;
    }
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    h3{
        font-weight: 400;
        color: #F06F19;
    }
    svg{
        font-size: 1.5rem;
    }
`;






export default ScheduleMeeting;