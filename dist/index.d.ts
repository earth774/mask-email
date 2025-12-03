interface MaskOptions {
    maskChar?: string;
    visibleStart?: number;
}
declare function maskEmail(email: string, options?: MaskOptions): string;

export { maskEmail };
