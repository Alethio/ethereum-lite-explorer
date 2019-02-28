import * as React from "react";
import { ValueBox } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { Hash } from "ethstats-ui/lib/data/Hash";

export interface IBlockNonceBoxProps {
    children: string;
}

export const BlockNonceBox: React.StatelessComponent<IBlockNonceBoxProps> = ({ children }) => (
    <ValueBox><Hash>{ children }</Hash></ValueBox>
);
