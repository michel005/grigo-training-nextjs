export class FileUtils {
    static fileToBase64 = (file: File, callback: (value: string) => void) => {
        const FR = new FileReader()

        FR.addEventListener('load', (evt) => {
            callback(evt?.target?.result?.toString() || '')
        })

        FR.readAsDataURL(file)
    }

    static saveContent = (content: string, fileName: string) => {
        const blob = new Blob([content], { type: 'text/json' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
    }
}
