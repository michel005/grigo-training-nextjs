export class StringUtils {
    static comparePaths = (path1: string, path2: string) => {
        const escapedPath2 = path2.replace(/\[id\]/g, '.*') // Substituir [id] por .*
        const regex = new RegExp('^' + escapedPath2.replace(/\//g, '\\/') + '$')
        return regex.test(path1)
    }
}
