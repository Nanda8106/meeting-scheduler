import React from "react";
import styled from "styled-components";
import ErrorMessages from "./errorMessages";


const OfficeHours = ({ error, setError, officeTimes, setOfficeTimes }) => {
    const handleTimeChange = name => event => {
        let minutes = event.target.value.slice(-2);
        if (minutes === "30" || minutes === "00") {
            setOfficeTimes({ ...officeTimes, [name]: event.target.value })
            if (event.target.value !== "") {
                setError({ ...error, officeHourseErrors: "" })
            }
        }else{
            setError({...error, officeHourseErrors: "Please select minutes either 00 or 30"})
        }
    }

    const { from, to } = officeTimes;
    const { officeHourseErrors } = error;
    return (
        <Wrap>
            <h3>Office Hours:</h3>
            {officeHourseErrors && (<ErrorMessages message={officeHourseErrors} />)}
            <div className="office-hours">
                <div className="from">
                    <label htmlFor="from">From:</label>
                    <input onChange={handleTimeChange("from")} value={from} type="time" name="from" required />
                </div>
                <div className="to">
                    <label htmlFor="to">To:</label>
                    <input onChange={handleTimeChange("to")} value={to} type="time" name="to" required />
                </div>
            </div>
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    min-width: 50%;
    margin-top: 2rem;
    margin-bottom: 2rem;
    h3{
        font-weight: 600;
        margin-bottom: 1rem;
        font-size:  1rem;
    }
    .office-hours{
        display: flex;
        justify-content: space-between;
        align-items: center;
        label{
            margin-right: 1rem;
        }
        
           
    }


`

export default OfficeHours;