import styled, { css } from 'styled-components';

export const RowStyles = css`
    display: grid;
    padding: 10px 0 20px 0;
    border-bottom: 2px solid lightgray;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    font-weight: 800;
    font-size: 20px;
    align-items: center;
    column-gap: 30px;

    >:nth-child(1) {
        width: 200px;
    }
`;

const centerStyles = css`
    text-align: center;
    cursor: pointer;
`;

export const RowItem = styled.div`
    ${RowStyles}
    
    .remove, .price {
        ${centerStyles}
    }
`;

export const Quantity = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ${centerStyles}

    .count {
        padding-top: 10px;
    }

    .decrement, .increment {
        font-size: 50px;
        padding: 10px;
        cursor: pointer;
    }
`;

