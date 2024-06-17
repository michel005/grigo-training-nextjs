export class AsyncUtils {
    static wait = async (timeout: number) => {
        await new Promise((x) => setTimeout(() => x(true), timeout))
    }
}
