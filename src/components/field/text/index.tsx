'use client'

import { FieldLayout } from '@/components/field/layout'
import { FieldTextType } from '@/components/field/text/index.type'
import { useState } from 'react'
import Button from '@/components/button'

export const FieldText = ({ label, icon, type }: FieldTextType) => {
    const [value, setValue] = useState<string | null>('')
    return (
        <FieldLayout
            label={label}
            haveValue={!!value}
            input={(setFocus) => (
                <input
                    type={type}
                    value={value || ''}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={(e) =>
                        setValue(e.target.value === '' ? null : e.target.value)
                    }
                />
            )}
            leftSide={icon && <Button leftIcon={icon} disabled={true} />}
            rightSide={
                !!value && (
                    <Button leftIcon="close" onClick={() => setValue(null)} />
                )
            }
        />
    )
}
