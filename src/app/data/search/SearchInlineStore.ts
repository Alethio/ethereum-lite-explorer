/**
 * HACK: This hack is needed to know whether there are inline search instances mounted in page.
 * If there are, toolbar search disables the "paste" anywhere behavior and the inline search
 * takes priority
 */
export class SearchInlineStore {
    instancesCount = 0;
}
