export type OdhResponse<T> = {
    CurrentPage: number;
    Items: T[];
    Seed: string | null;
    TotalPages: number
    TotalResults: number
}