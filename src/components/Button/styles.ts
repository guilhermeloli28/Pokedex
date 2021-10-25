import styled from "styled-components";

export const ButtonStyled = styled.button`
    font-size: 1rem;
    color: #FFF;
    background: var(--orange);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;
    transition: filter 0.2s;
    &:hover {
        filter: brightness(0.9);
    }
`;