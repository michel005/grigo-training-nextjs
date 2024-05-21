export class MaskUtils {
    static onlyNumbers = (value: string, size: number = -1) => {
        const tempValue = value
            .split('')
            .map((x) => parseInt(x))
            .filter((x) => x || x === 0 || x === Number.NaN)
            .join('')

        if (size === -1) {
            return tempValue
        } else {
            return tempValue.substring(0, size)
        }
    }

    static date = (v: string) => {
        const valueToUse = v.replaceAll('/', '')
        let temp = `${valueToUse.substring(0, 2)}/${valueToUse.substring(
            2,
            4
        )}/${valueToUse.substring(4, 8)}`
        if (temp.endsWith('/')) {
            temp = temp.replaceAll('/', '')
        }
        return temp
    }

    static rg = (value: string) => {
        const v = this.onlyNumbers(value)
        let temp = `${v.substring(0, 2)}.${v.substring(2, 5)}.${v.substring(5, 8)}-${v.substring(
            8,
            9
        )}`
        temp = temp.replaceAll('..', '').replaceAll('.-', '')
        if (temp.endsWith('-')) {
            temp = temp.replaceAll('-', '')
        }
        if (temp.endsWith('.')) {
            temp = temp.replaceAll('.', '')
        }
        return temp
    }

    static cpf = (value: string) => {
        const v = this.onlyNumbers(value)
        let temp = `${v.substring(0, 3)}.${v.substring(3, 6)}.${v.substring(6, 9)}-${v.substring(
            9,
            11
        )}`
        temp = temp.replaceAll('..', '').replaceAll('.-', '')
        if (temp.endsWith('-')) {
            temp = temp.replaceAll('-', '')
        }
        if (temp.endsWith('.')) {
            temp = temp.replaceAll('.', '')
        }
        return temp
    }

    static cnpj = (value: string) => {
        const v = this.onlyNumbers(value)
        let temp = `${v.substring(0, 2)}.${v.substring(2, 5)}.${v.substring(5, 8)}/${v.substring(
            8,
            12
        )}-${v.substring(12, 14)}`
        temp = temp.replaceAll('..', '').replaceAll('.-', '')
        if (temp.endsWith('-')) {
            temp = temp.replaceAll('-', '')
        }
        if (temp.endsWith('/')) {
            temp = temp.replaceAll('/', '')
        }
        if (temp.endsWith('.')) {
            temp = temp.replaceAll('.', '')
        }
        return temp
    }

    static cep = (value: string) => {
        const v = this.onlyNumbers(value)
        let temp = `${v.substring(0, 5)}-${v.substring(5, 8)}`
        if (temp.endsWith('-')) {
            temp = temp.replaceAll('-', '')
        }
        return temp
    }
}
