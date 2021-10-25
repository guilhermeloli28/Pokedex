import styled from "styled-components";

export const Container = styled.div`
    padding-left: 300px;
    padding-right: 300px;
    padding-top: 50px;
    padding-bottom: 50px;

    .isEmpty {
        margin-top: 130px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            background: transparent;
            width:40px;
        }
        span {
            font-size: 20px;
            margin-left: 20px;
        }
    }

    header {
        display: flex;
        height: 48px;
    }

    button {
        margin-left: 20px;
    }

    .logout {
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

    .containerDeck {
        margin-top: 80px;
    }
`;

export const Deck = styled.div`
    display: flex;
    height: 80px;
    background-color:  var(--shape);
    border-radius: 6px;
    padding-left: 40px;
    padding-right: 40px;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--orange);

    span {
        font-size: 20px;
        font-weight: bold;
    }

    & + div {
        margin-top: 2rem;
    }

    div {
        .goPokemon {
            border: 0;
            background: var(--orange);
            border-radius: 0.25rem;
            padding: 2px 8px;
            transition: filter 0.2s;
            color: #FFF;
            &:hover {
                filter: brightness(0.9);
            }
        }

        .btnEdit {
            border: 0;
            background: var(--blue);
            border-radius: 0.25rem;
            padding: 2px 8px;
            transition: filter 0.2s;
            color: #FFF;
            &:hover {
                filter: brightness(0.9);
            }
        }

        .btnRemove {
            border: 0;
            background: var(--red);
            border-radius: 0.25rem;
            padding: 2px 8px;
            transition: filter 0.2s;
            color: #FFF;
            &:hover {
                filter: brightness(0.9);
            }
        }
    }
`;
