export interface Error {
    success: boolean,
    message: string,
    error: any
}

export const instanceOfError = (data: any): data is Error => {
    return data.success !== undefined;
}