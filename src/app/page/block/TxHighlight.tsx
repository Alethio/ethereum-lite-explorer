import styled, { css } from "app/styled-components";

interface ITxHighlightProps {
    highlight: boolean;
}

export const TxHighlight = styled<ITxHighlightProps, "div">("div")`
    ${({highlight}) => highlight ? css`
        position: relative;
        &:before {
            content: "";
            position: absolute;

            border-radius: 50%;
            background-color: ${props => props.theme.colors.selectBoxBubble};
            width: 8px;
            height: 8px;
            top: 5px;
            left: -15px;
        }
    ` : ""}
`;
