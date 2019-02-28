import styled from "app/styled-components";

export interface IImageProps {
    src: string;
    height: string;
    width: string;
    className?: string;
}

export const Image = styled<IImageProps, "img">("img")`
    width: ${({width}) => width};
    height: ${({height}) => height};
`;
