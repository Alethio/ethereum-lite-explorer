import styled from "app/styled-components";

export const PADDING_LEFT = 241;

export const ContentLeftPadded = styled.div`
    box-sizing: border-box;
    padding-left: ${PADDING_LEFT}px;

    @media ${props => props.theme.mediaQueries.breakPoints.smallerThanStandardView} {
        padding-left: 0px;
    }
`;
