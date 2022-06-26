import React from "react";
import styled from "styled-components";
import ErrorMessages from "./errorMessages";


const RequestedDate = ({ requestMetting, setRequestMeeting, error, setError, }) => {
    const handleChangeRequested = name => event => {

        // checksif the user entered minutes 00 / 30
        let minutes = event.target.value.slice(-2);
        if (name === "startTime" || name === "endTime") {
            if (minutes === "30" || minutes === "00") {
                setRequestMeeting({ ...requestMetting, [name]: event.target.value })
                if (event.target.value !== "") {
                    setError({ ...error, requestedDaysErrors: "" })
                }
            } else {
                setError({ ...error, requestedDaysErrors: "Please select minutes either 00 or 30" })
            }
        } else {
            setRequestMeeting({ ...requestMetting, [name]: event.target.value })
            if (event.target.value !== "") {
                setError({ ...error, requestedDaysErrors: "" })
            }
        }
    }

    const { startDate, startTime, endDate, endTime } = requestMetting;
    const { requestedDaysErrors } = error;
    return (
        <>
            {requestedDaysErrors && (<ErrorMessages message={requestedDaysErrors} />)}
            <Wrap>
                <RequestedTimeWrap>
                    <h3>Requested Earliest Date and Time:</h3>
                    <div className="requested-date-time">
                        <div className="date">
                            <label htmlFor="date">Date:</label>
                            <input onChange={handleChangeRequested("startDate")} value={startDate} type="date" min="2015-01-01" max="2015-12-31" name="date" required />
                        </div>
                        <div className="time">
                            <label htmlFor="time">Time:</label>
                            <input type="time" onChange={handleChangeRequested("startTime")} value={startTime} name="time" required />
                        </div>
                    </div>
                </RequestedTimeWrap>
                <RequestedTimeWrap>
                    <h3>Requested End Date and Time:</h3>
                    <div className="requested-date-time">
                        <div className="date">
                            <label htmlFor="date">Date:</label>
                            <input type="date" onChange={handleChangeRequested("endDate")} value={endDate} min="2015-01-01" max="2015-12-31" name="date" required />
                        </div>
                        <div className="time">
                            <label htmlFor="time">Time:</label>
                            <input type="time" onChange={handleChangeRequested("endTime")} value={endTime} name="time" required />
                        </div>
                    </div>
                </RequestedTimeWrap>

            </Wrap>
        </>
    )
}

const RequestedTimeWrap = styled.div`
    width: 100%;
    /* margin-top: 2rem; */
    h3{
        font-weight: 600;
        margin-bottom: 1rem;
        font-size:  1rem;
    }
    .requested-date-time{
        display: flex;
        justify-content: space-between;
        align-items: center;
        label{
            margin: 1rem 0;
        }           
    }
`
const Wrap = styled.div`
    width: 100%;
    /* margin-top: 2rem; */
    display: grid;
    grid-template-columns: 47% 47%;
    gap: 6%;
    @media (max-width: 830px) {
        display: block;
    }
`
export default RequestedDate;
