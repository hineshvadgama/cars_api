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
            message: "Failed to get",
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
                message: "Failed to add",
                error: error
            }
        }
        return newData;
    }

    return fileData;
}

export const removeFromFile = (filePath: string, idToRemove: number): any => {

    const fileData = readFile(filePath);

    if (typeof(fileData) === 'string') {

        const parsedFileData: Array<any> = JSON.parse(fileData);
        const remainingArray: Array<any> = parsedFileData.filter(data => data.id !== idToRemove);
        const fileJsonData: string = JSON.stringify(remainingArray);

        try {
            fs.writeFileSync(filePath, fileJsonData, {encoding: 'utf-8', mode: 0o666, flag: 'w'});
        }
        catch (error) {
            return {
                success: false,
                message: "Failed to remove",
                error: error
            }
        }
        return fileJsonData;
    }
    return fileData;
}

export const updateFile = (filePath: string, idToUpdate: number, modifiedProperties: any): any => {

    const fileData = readFile(filePath);

    if (typeof(fileData) === 'string') {

        const parsedFileData: Array<any> = JSON.parse(fileData);
        let itemToUpdate: any = parsedFileData.filter(data => data.id === idToUpdate);
        itemToUpdate = itemToUpdate[0];

        // Only update the modified properties of the current object
        const keys = Object.keys(itemToUpdate);
        keys.forEach(key => {
            if (key !== 'id' && modifiedProperties[key] !== undefined) {
                itemToUpdate[key] = modifiedProperties[key];
            }
        });
        
        try {
            fs.writeFileSync(filePath, JSON.stringify(parsedFileData), {encoding: 'utf-8', mode: 0o666, flag: 'w'});
        }
        catch (error) {
            return {
                success: false,
                message: "Failed to modify",
                error: error
            }
        }
        return itemToUpdate;
    }
    return fileData;
}
