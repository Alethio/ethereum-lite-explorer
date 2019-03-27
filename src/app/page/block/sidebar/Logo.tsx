import * as React from "react";
import styled from "app/styled-components";

const LogoWrapper = styled.div`
    flex: 0 0 auto;
    width: 112px;
    height: 112px;
    padding-top: 18px;
    padding-left: 9px;
`;

const LogoInner = styled.div`
    background-color: ${props => props.theme.colors.blockLogoBackground};
    height: 40px;
    width: 76px;
    color: ${props => props.theme.colors.blockLogoText};
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    padding: 18px 0;
`;

export const Logo: React.StatelessComponent<{}> = ({ children }) => (
    <LogoWrapper>
        <LogoInner>{children}</LogoInner>
    </LogoWrapper>
);
