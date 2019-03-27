import {
    ITheme as IThemeBase,
    IThemeColors as IThemeBaseColors,
    IThemeSpacing as IThemeBaseSpacing,
    IThemeMediaQueries
} from "ethstats-ui/lib/theme/ITheme";
import { createPalette } from "ethstats-ui/lib/theme/createPalette";
import { createTheme as createBaseTheme } from "ethstats-ui/lib/theme/createTheme";

export interface ITheme extends IThemeBase {
    colors: IThemeColors;
    spacing: IThemeSpacing;
}

interface IThemeColors extends IThemeBaseColors {
    toolbarBetaSign: string;
    blockLogoBackground: string;
    blockLogoText: string;
    txLogoBackground: string;
    txLogoText: string;

    blockColorCode: string;
    txColorCode: string;
    contractColorCode: string;

    blockListItem: string;

    blockBoxText: string;
    addressHashBoxBg: string;
    parentHashBoxBg: string;
    parentHashBoxText: string;

    unclesBoxBg: string;
    unclesBoxBorder: string;
    unclesBoxText: string;

    txBoxText: string;
    cmBoxText: string;

    txViewSelector: string;
    txViewSelectorActive: string;

    minerLabelBg: string;
    minerLabelText: string;

    link: string;

    tooltipTxCountText: string;

    txTypeValue: string;
    txTypeCreate: string;
    txTypeCall: string;
    txTypeBoxText: string;
    txTypeBoxBackground: string;

    txSidebarItem: string;
    txSidebarItemActive: string;

    identiconBorder: string;

    accountTypeBoxText: string;
    accountTypeBoxBackground: string;
    accountAliasBg: string;
    accountAliasText: string;
    accountEthBalance: string;
    accountBalanceChartStroke: string;
    accountBalanceChartRefStroke: string;
    accountBalanceChartDisabledStroke: string;
    accountBalanceChartFill: string;
    accountBalanceChartOverlayBg: string;
    accountBalanceChartOverlayBorder: string;
    accountBalanceChartSmallStroke: string;
    accountBalanceChartSmallFill: string;
    accountPieChartFill: string;
    accountPieChartBg: string;
    accountSymbolGrid: string;

    qrCodeIcon: string;
    qrCodeIconActive: string;

    logEventsBorder: string;
    logEventsSectionBg: string;

    searchNoResultsText: string;

    readContractBorder: string;
    readContractSectionBg: string;
    readContractLabelBg: string;

    readInputBoxBg: string;
    readInputBoxBorder: string;
    readInputBoxText: string;

    payloadBoxBg: string;
    payloadBoxBorder: string;
    payloadDataName: string;
    payloadDataType: string;
    payloadDataValue: string;

    sidebarPageTitle: string;
    privacyPolicyTableBorder: string;
    cookieBannerBg: string;
    privacyNameBg: string;
    privacyNameText: string;
}

interface IThemeSpacing extends IThemeBaseSpacing {
    bubbleWrapperSize: number;
}

/*
 * We don't export a theme object directly to avoid importing it by accident without dependency injection
 */
export const createTheme: () => ITheme = () => {
    let palette = createPalette();
    let baseTheme = createBaseTheme(palette);

    let {
        BLUE, DARK_GREY, EXTRA_LIGHT_GREY, GREEN, GREY, LIGHT_GREY,
        MEDIUM_LIGHT_GREY, ORANGE, WHITE
    } = palette;

    let colors: IThemeColors = {
        ...baseTheme.colors,
        toolbarBetaSign: LIGHT_GREY,
        blockLogoBackground: BLUE,
        blockLogoText: WHITE,
        txLogoBackground: DARK_GREY,
        txLogoText: WHITE,

        blockColorCode: BLUE,
        txColorCode: DARK_GREY,
        contractColorCode: ORANGE,

        blockListItem: LIGHT_GREY,
        blockBoxText: WHITE,
        addressHashBoxBg: LIGHT_GREY,
        parentHashBoxBg: GREY,
        parentHashBoxText: WHITE,
        unclesBoxBg: WHITE,
        unclesBoxBorder: BLUE,
        unclesBoxText: BLUE,
        txBoxText: WHITE,
        cmBoxText: WHITE,
        txViewSelector: LIGHT_GREY,
        txViewSelectorActive: DARK_GREY,
        minerLabelBg: WHITE,
        minerLabelText: BLUE,
        link: BLUE,
        tooltipTxCountText: GREY,

        txTypeValue: GREEN,
        txTypeCreate: ORANGE,
        txTypeCall: DARK_GREY,
        txTypeBoxText: DARK_GREY,
        txTypeBoxBackground: WHITE,

        txSidebarItem: LIGHT_GREY,
        txSidebarItemActive: DARK_GREY,
        identiconBorder: LIGHT_GREY,
        accountTypeBoxText: DARK_GREY,
        accountTypeBoxBackground: WHITE,
        accountAliasBg: DARK_GREY,
        accountAliasText: WHITE,
        accountEthBalance: DARK_GREY,
        accountBalanceChartStroke: BLUE,
        accountBalanceChartRefStroke: LIGHT_GREY,
        accountBalanceChartDisabledStroke: GREY,
        accountBalanceChartFill: EXTRA_LIGHT_GREY,
        accountBalanceChartOverlayBg: WHITE,
        accountBalanceChartOverlayBorder: LIGHT_GREY,
        accountBalanceChartSmallStroke: BLUE,
        accountBalanceChartSmallFill: LIGHT_GREY,
        accountPieChartFill: BLUE,
        accountPieChartBg: WHITE,
        accountSymbolGrid: GREY,
        qrCodeIcon: GREY,
        qrCodeIconActive: DARK_GREY,
        logEventsBorder: LIGHT_GREY,
        logEventsSectionBg: WHITE,
        searchNoResultsText: BLUE,
        readContractBorder: LIGHT_GREY,
        readContractSectionBg: WHITE,
        readContractLabelBg: DARK_GREY,
        readInputBoxBg: WHITE,
        readInputBoxBorder: MEDIUM_LIGHT_GREY,
        readInputBoxText: DARK_GREY,
        payloadBoxBg: WHITE,
        payloadBoxBorder: LIGHT_GREY,
        payloadDataName: BLUE,
        payloadDataType: GREY,
        payloadDataValue: DARK_GREY,
        sidebarPageTitle: LIGHT_GREY,
        privacyPolicyTableBorder: LIGHT_GREY,
        cookieBannerBg: GREY,
        privacyNameBg: DARK_GREY,
        privacyNameText: WHITE
    };

    let spacing: IThemeSpacing = {
        ...baseTheme.spacing,
        bubbleWrapperSize: 24
    };

    let mediaQueries: IThemeMediaQueries = baseTheme.mediaQueries;

    return {
        colors,
        spacing,
        mediaQueries
    };
};
