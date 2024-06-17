export interface ErrorUnitType {
    code: string
    message: string
}

export interface ErrorCollection {
    [key: string]: ErrorUnitType
}

export interface ErrorType {
    type: 'single' | 'collection'
    errors: ErrorUnitType | ErrorCollection
}
