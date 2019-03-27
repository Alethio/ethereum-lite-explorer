// Patch timeout/interval function declarations to work with both lib.d.ts and node.d.ts included in the project
/// <reference types="node" />

declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
declare function clearTimeout(timeoutId: NodeJS.Timer | number): void;
declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
declare function clearInterval(intervalId: NodeJS.Timer | number): void;
