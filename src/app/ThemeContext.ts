/**
 * Sometimes we need access to the theme object outside of a styled-component.
 *
 * We use this instead of styled-components "withTheme", which produces some inconveniences:
 * 1. it has some performance penalties
 * 2. we have to wrap our component with a HOC and alter the props interface
 *
 * It's cleaner to drop in ThemeContext.Consumer inside the component's render method
 */
import * as React from "react";
import { ITheme } from "./theme";

export const ThemeContext = React.createContext<ITheme>((void 0)!);
