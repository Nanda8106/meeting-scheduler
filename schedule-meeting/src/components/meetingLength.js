import React from "react";
import styled from "styled-components";

const MeetingLength = ({ meetingTime, setMeetingTime }) => {
    const increaseMeetingTime = () => {
        if (meetingTime < 240) {
            setMeetingTime(meetingTime + 30)
        }
    }

    const decreaseMeetingTime = () => {
        if (meetingTime > 30) {
            setMeetingTime(meetingTime - 30)   
        }
    }

    return (
        <Wrap>
            <h3>Meeting Length - Min:</h3>
            <div className="meeting-timmings">
                <button onClick={decreaseMeetingTime}>-</button>
                <span>{meetingTime}</span>
                <button onClick={increaseMeetingTime}>+</button>
            </div>
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    min-width: 50%;
    margin-top: 2rem;
    h3{
        font-weight: 600;
        margin-bottom: 1rem;
        font-size:  1rem;
    }
    .meeting-timmings{
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
            font-size: 1.2rem;
        }
        button{
            outline: none;
            border: none;
            width: 1rem;
            height: 1rem;
            padding: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: black;
            color: white;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease-in;
            &:hover{
                background: #2A2A29;
            }
        }
    }
    @media (max-width: 830px) {
        width: 100%;
    }


`

export default MeetingLength;