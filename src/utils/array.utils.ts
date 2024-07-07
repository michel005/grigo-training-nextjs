export class ArrayUtils {
    static move = (collection: any[], origin: number, target: number) => {
        const array = JSON.parse(JSON.stringify(collection))

        if (target > origin) {
            const targetObject = array[origin]
            for (let i = origin; i < target; i++) {
                array[i] = array[i + 1]
            }
            array[target] = targetObject
        } else {
            const originObject = array[origin]
            const copy = JSON.parse(JSON.stringify(array))
            for (let i = target; i < origin; i++) {
                array[i + 1] = copy[i]
            }
            array[target] = originObject
        }

        return array
    }
}
