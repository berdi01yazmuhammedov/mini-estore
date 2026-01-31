export const detectBrand = (name: string): string => {
    const upper = name.toUpperCase();

    if (upper.startsWith('WAKA')) return 'WAKA';
    if (upper.startsWith('LOST MARY')) return 'LOST MARY';
    if (upper.startsWith('ELFBAR')) return 'ELFBAR';
    if (upper.startsWith('HQD')) return 'HQD';
    if (upper.startsWith('PUFFMI')) return 'PUFFMI';
    if (upper.startsWith('PLONQ')) return 'PLONQ';

    return '';
};
