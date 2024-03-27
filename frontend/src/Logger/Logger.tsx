export class Logger {
    static log(message: string, ...optionalParams: unknown[]) {
        if(process.env.NODE_ENV !== 'production') {
            console.log(message, ...optionalParams);
        }
    }

    static error(message: string, ...optionalParams: unknown[]) {
        if(process.env.NODE_ENV !== 'production') {
            console.error(message, ...optionalParams);
        }
    }
}