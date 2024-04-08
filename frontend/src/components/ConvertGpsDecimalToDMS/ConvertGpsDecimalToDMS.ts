export default function ConvertGpsDecimalToDMS(decimal: number, isLongitude: boolean): string {
    const absolute = Math.abs(decimal);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(1);

    let direction: string;
    if (isLongitude) {
        direction = decimal >= 0 ? 'E' : 'W';
    } else {
        direction = decimal >= 0 ? 'N' : 'S';
    }

    return `${degrees}°${minutes}'${seconds}"${direction}`;
}