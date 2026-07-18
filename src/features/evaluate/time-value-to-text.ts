export function timeValueToText(timeValue: number): string {
    if (timeValue === 0) {
        return '0 секунд';
    }

    const negativeValue = timeValue < 0;
    if (negativeValue) {
        timeValue = -timeValue;
    }

    timeValue = Math.round(timeValue * 1000);

    const mseconds = timeValue % 1000;
    timeValue = Math.floor(timeValue / 1000);

    const seconds = timeValue % 60;
    timeValue = Math.floor(timeValue / 60);

    const minutes = timeValue % 60;
    timeValue = Math.floor(timeValue / 60);

    const hours = timeValue;

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
    if (mseconds > 0) {
        parts.push(`${mseconds}мс`);
    }

    return (negativeValue ? '-' : '') + parts.join(' ');
}
