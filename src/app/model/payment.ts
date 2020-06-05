
export interface Payment {
    id: number | null;
    name: string;
    amount: number;
    code: number;
    grid: Array<Array<string>>
}