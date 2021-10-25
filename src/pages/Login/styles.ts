
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    padding-top: 120px;
    padding-left: 120px;

    img {
        margin-left: 200px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    width: 400px;
    margin-top:50px;
    
    input {
        padding: 0 1rem;
        height: 55px;
        border-radius: 4px;
        border: 1px solid #d7d7d7;
        background: #e7e9ee;
        font-weight: 400;
        font-size: 1rem;
        margin-top: 20px;
        outline: 0;
        
        &::placeholder {
            color: var(--text-body);
        }

        &:focus {
            border: 1px solid var(--orange);
        }

        & + input {
            margin-top: 1rem;
        }
    }

    button {
        margin-top: 20px;
    }

    a {
        margin-top: 20px;
        color: var(--text-body);
        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.7);
        }
    }

    span {
        color: red;
        font-size: 13px;
        margin-top: 3px;
    }
`;