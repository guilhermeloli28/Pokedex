import styled from "styled-components";

export const Container = styled.div`
    padding-left: 300px;
    padding-right: 300px;
    padding-top: 50px;
    padding-bottom: 50px;
        
    header {
        display: flex;
        height: 48px;
    }

    button {
        margin-left: 20px;
    }

    .msgExceedLimit {
        color: var(--red);
    }

    .goBack {
        border: 0;
        font-size: 1rem;
        color: #FFF;
        width: 100px;
        background: var(--orange);
        margin-left: auto;
        border-radius: 0.25rem;
        height: 3rem;
        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.9);
        }
    }

    div {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        ul {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 20px;
            list-style: none;
        }
    }
`;