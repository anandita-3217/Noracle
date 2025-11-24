// src/types/asdfjkl.d.ts
declare module 'asdfjkl' {
    interface AsdfjklOptions {
        threshold?: number;
    }
    
    function asdfjkl(text: string, options?: AsdfjklOptions): boolean;
    
    export default asdfjkl;
}
