import { RefObject, useEffect, useRef, useState } from 'react'
import { ErrorType } from '@/types/error.type'

export const useClosestDataForm = (elementRef: RefObject<any>) => {
    const [dataForm, setDataForm] = useState<string | null>(null)
    const [errorForm, setErrorForm] = useState<ErrorType | null>(null)
    const ref = useRef<any>(null)

    useEffect(() => {
        if (elementRef.current) {
            const closestElementForm = elementRef.current.closest('[data-form]')
            if (closestElementForm) {
                setDataForm(closestElementForm.getAttribute('data-form'))
                ref.current = closestElementForm
            }
        }
    }, [elementRef])

    useEffect(() => {
        if (!ref.current) return
        const targetNode = ref.current

        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'data-errors'
                ) {
                    const newValue = targetNode.getAttribute('data-errors')
                    setErrorForm(JSON.parse(newValue))
                }
            }
        })

        observer.observe(targetNode, {
            attributes: true, // Observe changes to attributes
        })

        return () => {
            observer.disconnect()
        }
    }, [ref.current])

    return { dataForm, errorForm }
}
