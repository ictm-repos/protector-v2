import styled from "styled-components";

export const Button = styled.button`
    padding:10px 5px;
    outline:none;
    border: none;
    border-radius: 4px;
    &:hover{
        cursor:pointer;
        opacity: 0.8;
    }
    
`

export const PrimaryButton = styled(Button)`
    background-color: blue;
    color:white;
`