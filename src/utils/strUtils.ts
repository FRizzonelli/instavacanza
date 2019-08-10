export function truncateString(str: string, size: number) {
    if (str.length > size) {
        return str.slice(0, size) + '...';
    } else {
        return str;
    }
}