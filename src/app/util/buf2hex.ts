export function buf2hex(buffer: Uint8Array) {
    return Array.prototype.map.call((buffer),
        (x: number) => ("00" + x.toString(16)).slice(-2)).join("");
}
