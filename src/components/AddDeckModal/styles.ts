import styled from "styled-components";

export const Container = styled.form`
    display: flex;
    flex-direction: column;

    button {
        margin-top: 40px;
    }

    span {
        font-size: 10px;
        margin-top: 5px;
        color: var(--red);
    }

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
        width: 100%;
        
        &::placeholder {
            color: var(--text-body);
        }

        &:focus {
            border: 1px solid var(--orange);
        }
    }
`;