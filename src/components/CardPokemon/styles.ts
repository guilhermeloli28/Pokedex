import styled from "styled-components";

export const Card = styled.li`
    width: 250px;
    height: 250px;
    border-radius: 6px;
    border: 1px solid var(--orange);
    background-color:  var(--shape);
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    align-items: center;

    span {
        font-size: 20px;
    }

    img {
        width: 100px;
        height: 100px;
        margin-top: 10px;
    }

    button {
        margin-top: 20px;
    }
`;