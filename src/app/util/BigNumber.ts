// tslint:disable-next-line:import-blacklist
import { BigNumber as BN } from "bignumber.js";

export const BigNumber = BN.clone();
export type BigNumber = BN;

export type Format = BN.Format;
