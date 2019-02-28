import * as assert from "assert";

/** See https://stackoverflow.com/a/46957474 */
export async function assertThrowsAsync(
    fn: (...args: any[]) => Promise<any>,
    error: ((err: any) => boolean) | Function
) {
    // tslint:disable-next-line:no-empty
    let f = () => { };
    try {
        await fn();
    } catch (e) {
        f = () => { throw e; };
    } finally {
        assert.throws(f, error);
    }
}
