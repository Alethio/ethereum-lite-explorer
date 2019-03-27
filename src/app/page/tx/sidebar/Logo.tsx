import * as React from "react";
import styled from "app/styled-components";

const LogoWrapper = styled.div`
    flex: 0 0 auto;
    width: 112px;
    height: 112px;
    padding-top: 15px;
    padding-left: 6px;
    box-sizing: border-box;
`;

const SIZE = 82;

const LogoInner = styled.div`
    background-color: ${props => props.theme.colors.txLogoBackground};
    border-radius: ${SIZE / 2}px;
    color: ${props => props.theme.colors.txLogoText};
    font-size: 32px;
    line-height: 38px;
    font-weight: 700;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 24px;
    width: ${SIZE}px;
`;

export const Logo: React.StatelessComponent<{}> = ({ children }) => (
    <LogoWrapper>
        <LogoInner>{children}</LogoInner>
    </LogoWrapper>
);
