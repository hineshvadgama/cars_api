export interface Car {
    id?: number;
    make?: string;
    model?: string;
    similarModelWords?: string;
    colour?: string;
    year?: number;
}

export const instanceOfCar = (data: any): data is Car => {
    return data.make !== undefined;
}
