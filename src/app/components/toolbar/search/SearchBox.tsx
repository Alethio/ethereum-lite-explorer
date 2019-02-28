import styled from "app/styled-components";

// TODO: Extract functionality that is common with ReadInput
export const SearchBox = styled.input`
    display: block;
    color: ${props => props.theme.colors.overlayText};
    width: 100%;
    padding-top: 5px;
    padding-bottom: 9px;
    height: 22px;
    font-family: 'Barlow', Arial, sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    border: none;
    outline: none;

    ::placeholder {
        color: ${props => props.theme.colors.toolbarIcon};
        opacity: 1; /* Firefox */
    }

    ::-ms-input-placeholder {
        color: ${props => props.theme.colors.toolbarIcon};
    }

    ::-ms-clear {
        display: none;
    }
`;
