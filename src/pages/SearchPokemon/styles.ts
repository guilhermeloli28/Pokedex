import styled from "styled-components";

export const Container = styled.div`
    padding-left: 80px;
    padding-right: 80px;
    padding-top: 40px;
    padding-bottom: 40px;

    input {
        width: 100%;
        margin-top: 40px;
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
    }

    header {
        display: flex;
        button {
            margin-left: 30px;
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
    }

    div {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        ul {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-gap: 20px;
            list-style: none;
        }
    }

    .loadMore {
        margin-top: 40px;
    }
`;