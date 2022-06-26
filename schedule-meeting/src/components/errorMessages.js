import React from "react";
import styled from "styled-components";

const ErrorMessages = ({message}) => {
    return(
        <Message>{message}</Message>
    )
}

const Message = styled.p`
    font-size: 0.7rem;
    color: red;
    margin-bottom: 0.5rem;
`;

export default ErrorMessages;