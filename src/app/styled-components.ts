/*
 * Wrapper for styled-components library
 *
 * This serves two purpuses:
 * 1. reduce the footprint of the library so we can replace/upgrade it easier
 * 2. ensure Theme type safety (see https://www.styled-components.com/docs/api#define-a-theme-interface)
 */
// tslint:disable-next-line:import-blacklist
import * as styledComponents from "styled-components";
// tslint:disable-next-line:import-blacklist
import { ThemedStyledComponentsModule } from "styled-components";

import { ITheme } from "./theme";

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
  withTheme
} = styledComponents as ThemedStyledComponentsModule<ITheme>;

export { css, injectGlobal, keyframes, ThemeProvider, withTheme };
// tslint:disable-next-line:no-default-export
export default styled;
