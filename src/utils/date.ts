export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
        timeZoneName: 'short',
        timeZone: 'UTC', // Replace with your desired timezone offset
    };
  
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(date);
  
    return formattedDate.replace(' ', 'T') + ' ' + date.toTimeString().split(' ')[0];
}

export function dateToYYYYMMDD_HHMM(Date: Date): string {
    let DS: string = Date.getFullYear()
        + '/' + ('0' + (Date.getMonth() + 1)).slice(-2)
        + '/' + ('0' + Date.getDate()).slice(-2)
        + ' ' + ('0' + Date.getHours()).slice(-2)
        + ':' + ('0' + Date.getMinutes()).slice(-2)
    return DS
}