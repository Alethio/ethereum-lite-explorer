import { evmOpcodes } from "./evmOpcodes";

/**
 * See https://www.etherchain.org/javascripts/disasm.js
 */
export function evmDisasm(byteCode: string) {
    let codes = byteCode.match(/(..?)/g)!;

    let dis = "";

    for (let i = 0; i < codes.length; i++) {
        let opcode = evmOpcodes[codes[i]];

        if (!opcode) {
            // tslint:disable-next-line:no-console
            console.warn(`Unknown opcode (0x${codes[i]})`);
            dis = dis + `UNKNOWN (0x${codes[i]}) \n`;
        } else if (opcode.substr(0, 4) === "PUSH") {
            let length = parseInt(opcode.replace("PUSH", ""), 10);
            let data = codes.slice(i + 1, i + length + 1).join("");
            dis = dis + opcode + " 0x" + data + "\n";
            i = i + length;
        } else {
            dis = dis + opcode + "\n";
        }
    }

    return dis;
}
