import styled from "app/styled-components";

export const ContentTop = styled.div`
    background-color: #FFFFFF;
    padding-top: ${({theme}) => theme.spacing.contentTop}px;
    box-sizing: border-box;
    display: flex;

    @media ${props => props.theme.mediaQueries.breakPoints.smallerThanStandardView} {
        flex-direction: column;
        align-items: center;
    }
`;
