import styled from "app/styled-components";

interface IHighlightSelectBoxProps {
    disabled?: boolean;
}

export const HighlightSelectBox = styled<IHighlightSelectBoxProps, "div">("div")`
    font-size: 12px;
    height: 28px;
    text-transform: uppercase;
    font-weight: bold;
    padding: 0px 32px 0px 24px;
    box-sizing: border-box;
    border: 1px solid ${props => props.theme.colors.selectBoxBorder};
    border-radius: 4px;
    background-color: ${props => props.theme.colors.selectBoxBg};
    vertical-align: middle;
    line-height: 24px;
    color: ${props => !props.disabled ? props.theme.colors.selectBoxText : props.theme.colors.selectBoxTextDisabled};
    cursor: ${props => props.disabled ? "default" : "pointer"};

    position: relative;
    &:before {
        content: "";
        position: absolute;

        border-radius: 50%;
        background-color: ${props => !props.disabled ?
            props.theme.colors.selectBoxBubble :
            props.theme.colors.selectBoxTextDisabled};
        width: 8px;
        height: 8px;
        top: 9px;
        left: 8px;
    }
    &:after {
        content: "";
        position: absolute;

        top: 10px;
        right: 11px;
        border-top: 5px solid ${props => props.theme.colors.selectBoxArrow};
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }
`;
