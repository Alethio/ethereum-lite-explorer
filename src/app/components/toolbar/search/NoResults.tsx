import styled, { css } from "app/styled-components";

interface INoResultsProps {
    inline?: boolean;
}

export const NoResults = styled<INoResultsProps, "div">("div")`
    ${({inline}) => inline ? null : css`
        position: absolute;
        bottom: 0;
        left: 0;
        padding-top: 24px;
        transform: translateY(100%);
    `}
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    color: ${props => props.theme.colors.searchNoResultsText};
    font-size: 12px;
    line-height: 14px;
    font-weight: 700;
    letter-spacing: .4px;
`;
