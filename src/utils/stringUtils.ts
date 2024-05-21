export class StringUtils {
    static comparePaths = (path1: string, path2: string) => {
        const escapedPath2 = path2.replace(/\[id\]/g, '.*') // Substituir [id] por .*
        const regex = new RegExp('^' + escapedPath2.replace(/\//g, '\\/') + '$')
        return regex.test(path1)
    }

    static initialLetters = (value: string) => {
        const slices = value.split(' ')
        if (slices.length === 0) {
            return 'NF'
        }
        if (slices.length === 1) {
            return slices[0].substring(0, 2)
        } else {
            return slices[0].substring(0, 1) + slices.pop()?.substring(0, 1)
        }
    }

    static firstAndLastName = (name: string) => {
        const slices = name.split(' ')
        if (slices.length === 1) {
            return name
        } else {
            let newName = slices.shift()
            slices.forEach((n, index) => {
                if (index < slices.length - 1) {
                    if (n.length > 3) {
                        newName = `${newName} ${n.substring(0, 1)}. `
                    }
                } else {
                    newName = `${newName} ${n}`
                }
            })
            return newName
        }
    }
}
