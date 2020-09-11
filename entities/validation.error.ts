export interface IValidationError {
    succeed: boolean,
    message: string,
    results: { [name: string]: string[] },
    metas: { [key: string]: unknown }
}