export interface UseFormType<T> {
    form: T
    field: (prop: string) => any
    haveField: (prop: string) => boolean
    update: (prop: string, value: any) => void
    updatePrev: (value: (v: T) => T) => void
}
