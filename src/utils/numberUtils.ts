export class NumberUtils {
    static numberToCurrency = (value: number | undefined) => {
        if (value === undefined) {
            return null
        }
        return (value / 100).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
        })
    }
}
