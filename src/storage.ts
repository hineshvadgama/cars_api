import fs from 'fs';
import { Error } from './error/error';

export const readFile = (filePath: string): string | Error => {

    let fileData: string | Error;

    try {
        fileData = fs.readFileSync(filePath, { encoding: 'utf-8', flag: 'r' });
    }
    catch (error) {

        return {
            success: false,
            message: "Failed to get cars",
            error: error
        }
    }

    return fileData;
}

export const addToFile = (filePath: string, newData: any): any => {

    const fileData = readFile(filePath);

    if (typeof(fileData) === 'string') {

        const parsedFileData: Array<any> = JSON.parse(fileData);
        parsedFileData.push(newData);
        const fileJsonData: string = JSON.stringify(parsedFileData);

        try {
            fs.writeFileSync(filePath, fileJsonData, {encoding: 'utf-8', mode: 0o666, flag: 'w'});
        }
        catch (error) {
            return {
                success: false,
                message: "Failed to add car",
                error: error
            }
        }
        return newData;
    }

    return fileData;
}
