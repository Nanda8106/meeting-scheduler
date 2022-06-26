import React from "react";
import styled from "styled-components";
import { Wrap } from "../assets/style/style";

const DisplayResults = ({finalFreeTimes}) => {
    return (
        <>
            <Wrap>
                <Header><h4>Scheduled Meetings</h4></Header>
                <ResultsWrap>
                    {finalFreeTimes.map( (time, index) => (
                        <div key={index}>
                            {time}
                        </div>
                    ))}
                </ResultsWrap>
            </Wrap>
        </>
    )

}

const Header = styled.div`
    width: 100%;
    text-align: center;
    margin: 2rem 0;
    h4{
        font-weight: 600;
    }
`
const ResultsWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
    div{
        width: 150px;
        border: 1px solid black;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover{
            background: black;
            color: white;
        }
    }

`



export default DisplayResults