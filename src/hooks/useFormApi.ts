import { useEffect, useState } from 'react'
import useForm from './useForm'

const useFormApi = <T>({
    api,
    formName,
}: {
    api: () => Promise<T>
    formName: string
}) => {
    const form = useForm<T>(formName)
    const [error, setError] = useState<string | null>(null)
    const [status, setStatus] = useState<
        'IDDLE' | 'START' | 'LOADING' | 'SUCCESS' | 'ERROR'
    >('IDDLE')

    const run = () => {
        setStatus('IDDLE')
    }

    useEffect(() => {
        if (status === 'IDDLE') {
            setStatus('LOADING')
            console.log('Call api')
        }
        if (status == 'LOADING') {
            api()
                .then((response) => {
                    form.update(response)
                    setStatus('SUCCESS')
                })
                .catch((error) => {
                    form.clear()
                    setStatus('ERROR')
                    setError(error)
                })
        }
    }, [api, form, status])

    return { form, error, status, run }
}

export default useFormApi
