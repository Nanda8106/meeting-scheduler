import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const DisplayInputNames = ({ selectedEmployees, setSelectedEmployees }) => {
    const removeEmployeeHandler = (id) => {
        setSelectedEmployees(selectedEmployees.filter( (emp) => emp.id !== id))
    }
    return (
        <>
            <DetailsWrap>
                {selectedEmployees.map((emp) => (
                    <EachEmployee key={emp.id}>
                        <p>{emp.name}</p>
                        <FontAwesomeIcon onClick={() => {removeEmployeeHandler(emp.id)}} size="1x" icon={faClose} />
                    </EachEmployee>
                ))}
            </DetailsWrap>
        </>
    )
}


const DetailsWrap = styled.div`
    width: 100%;
    display: flex;
    margin-top: 1rem;
    flex-wrap: wrap;
    gap: 10px;
`
const EachEmployee = styled.div`
    position: relative;
    background: #FF3296;
    border-radius: 0.5rem;
    align-items: center;
    padding: 0.5rem;
    padding-right: 1.5rem;
    p{
        font-size: 0.8rem;
    }
    svg{
        position: absolute;
        right: -5px;
        top: -5px;
        width: 16px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: black;
        color: white;
        font-size: 0.5rem;
        padding: 0.1rem;
        cursor: pointer;
    }

`
export default DisplayInputNames;