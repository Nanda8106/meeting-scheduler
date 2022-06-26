import React from "react";
import styled from "styled-components";
import icon from "../assets/images/icon.png";

const NavBar = () => {
    return(
        <Nav>
            <span>
                <h2>lime</h2>
                <img src={icon} alt="logo" />
            </span>
        </Nav>
    )
}

const Nav = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    height: 5rem;
    padding: 1rem 10rem;
    span{
        display: flex;
        align-items: flex-end;
        h2{
            font-weight: 400;
        }
        img{
            width: 2rem;
            height: 2rem;
        }
    }
    @media (max-width: 700px) {
        padding: 1rem 2rem;
    }
`
export default NavBar;