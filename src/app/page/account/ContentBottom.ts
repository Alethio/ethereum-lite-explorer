import styled from "app/styled-components";

export const ContentBottom = styled.div`
    background-color: ${props => props.theme.colors.mainContentBg};
    padding-bottom: ${({theme}) => theme.spacing.contentBottom}px;
    box-sizing: border-box;
    flex-grow: 1;
`;
