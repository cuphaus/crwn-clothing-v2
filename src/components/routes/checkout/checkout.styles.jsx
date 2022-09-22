import styled from 'styled-components';
import { RowStyles } from '../../checkout-item/checkout-item.styles';

export const CheckoutList = styled.div`
    max-width: 1000px;
    margin: 0 auto;
`;

export const Total = styled.div`
    text-align: right;
    font-size: 30px;
    font-weight: 800;
    padding-top: 30px;
    margin-bottom: 50px;
`;

export const Header = styled.div`
    border-top: 0;

    /* 'remove', 'description', and 'quantity' headers*/
    :nth-child(3),
    :nth-child(4),
    :nth-child(5) {
        text-align: center;
    }

    ${RowStyles}
`;
