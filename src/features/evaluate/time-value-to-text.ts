export function timeValueToText(timeValue: number): string {
    if (timeValue === 0) {
        return '0 секунд';
    }

    const seconds = Math.floor(timeValue % 600) / 10;
    const minutes = Math.floor(timeValue / 60) % 60;
    const hours = Math.floor(timeValue / 3600);

    const parts: string[] = [];

    if (hours > 0) {
        parts.push(`${hours}ч`);
    }
    if (minutes > 0) {
        parts.push(`${minutes}м`);
    }
    if (seconds > 0 || parts.length === 0) {
        parts.push(`${seconds}с`);
    }

    return parts.join(' ');
}
