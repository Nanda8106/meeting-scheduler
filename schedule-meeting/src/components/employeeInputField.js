import React from "react";
import styled from "styled-components";
import DisplayInputNames from "./displayInputNames";
import ErrorMessages from "./errorMessages";

const EmployeeInputField = ({
    data,
    selectedEmployees,
    setSelectedEmployees,
    employeeName,
    setEmployeeName,
    error,
    setError,
}) => {

    const { errorNameMessage } = error;
    const nameChangeHandler = event => {
        setEmployeeName(event.target.value);
        let employee = data.filter((emp) => emp.name === event.target.value)
        if (employee[0] === undefined) {
            setError({ ...error, errorNameMessage: "Invalid name" })
        } else {
            setError({ ...error, errorNameMessage: "" })
        }

    }
    const addNameHandler = () => {
        // if (errorNameMessage === "") {
        if (employeeName !== "") {
            let employee = data.filter((emp) => emp.name === employeeName)
            let isNameAlreadyExist = selectedEmployees.filter((emp) => emp.id === employee[0].id)
            if (isNameAlreadyExist[0] === undefined) {
                setSelectedEmployees([...selectedEmployees, employee[0]])
                setEmployeeName("")
            } else {
                setError({ ...error, errorNameMessage: "Employee already exist!" })
                setEmployeeName("")
            }
        } else {
            setError({ ...error, errorNameMessage: "Input is empty!" })
        }
        // }
    }
    return (
        <InputWrap>
            <div className="name-search-wrap">
                {errorNameMessage && (
                    <ErrorMessages message={errorNameMessage} />
                )}
                <div className="input-search">
                    <input type="text" onChange={nameChangeHandler} value={employeeName} placeholder="Enter participants name" list="names" />
                    <datalist id="names" style={{ maxHeight: "300px" }}>
                        {data.map((eachData, index) => (
                            <option key={index} value={eachData.name} />
                        ))}
                    </datalist>
                    <button onClick={addNameHandler}>Add</button>
                </div>
                {selectedEmployees.length > 0 && (
                    <DisplayInputNames selectedEmployees={selectedEmployees} setSelectedEmployees={setSelectedEmployees} />
                )}

            </div>

        </InputWrap>
    )
}



const InputWrap = styled.div`
    width: 100%;
    margin-top: 3rem;
    .input-search{
        display: flex;
        justify-content: space-between;
        align-items: center;
        input{
            width: 90%;
            outline: none;
            padding: 1.2rem 1rem;
            border: 1px solid rgba(0, 0, 0, 0.5);
            border-radius: 0.5rem;
            color: black;
            height: 1rem;
        }
        button{
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;
            width: 80px;
            height: 1rem;
            padding: 1.2rem 0;
            background: black;
            color: white;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease-in;
            margin-left: 1rem;
            &:hover{
                background: #2A2A29;
            }
        }
    }
`

export default EmployeeInputField;