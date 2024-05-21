'use client'

import { ConfigContext } from '@/store/config.context'
import { FileUtils } from '@/utils/fileUtils'
import React, { useContext, useRef, useState } from 'react'
import Button from '../button'
import FlexColumn from '../layout/flexColumn'
import FormLayout from '../layout/formLayout'
import { Icon } from '../icon'
import Picture from '../picture'
import Skeleton from '../skeleton'
import FlexRow from '../layout/flexRow'
import Modal from '../modal'

type PictureFieldType = {
    alt?: string
    formField?: string
    loading?: boolean
    disabled?: boolean
    variant?: 'rounded' | 'circle' | 'square'
    size?: number
}

const PictureField = ({
    alt,
    formField,
    loading,
    disabled,
    variant = 'rounded',
    size = 200,
}: PictureFieldType) => {
    const ref = useRef<any>(null)
    const [showPreview, setShowPreview] = useState(false)
    const [content, setContent] = useState<string | null>(null)
    const { formValue, updateFormProperty } = useContext(ConfigContext)
    const [formName, fieldName] = formField?.split('|') || [
        undefined,
        undefined,
    ]

    const haveValue =
        formName && fieldName
            ? !!formValue(formName)?.[fieldName]?.value
            : false

    if (loading) {
        return (
            <FormLayout className={`componentPictureField ${variant}`}>
                <Skeleton height={size} width={size} />
            </FormLayout>
        )
    }

    return (
        <FormLayout className={`componentPictureField ${variant}`}>
            <Picture
                alt={alt || ''}
                className="componentPictureField__picture"
                variant={variant}
                picture={
                    formName && fieldName
                        ? formValue(formName)?.[fieldName]?.value
                        : undefined
                }
                afterLoad={(cont) => setContent(cont)}
                size={size}
            />
            {!disabled && (
                <FlexColumn className="componentPictureField__commands">
                    <Button
                        leftSpace={<Icon>folder_open</Icon>}
                        onClick={() => {
                            ref.current?.click()
                        }}
                    />
                    {haveValue && (
                        <FlexRow>
                            <Button
                                leftSpace={<Icon>close</Icon>}
                                onClick={() => {
                                    if (formName && fieldName) {
                                        updateFormProperty(
                                            formName,
                                            fieldName,
                                            null
                                        )
                                        ref.current.value = ''
                                    }
                                }}
                            />
                            <Button
                                leftSpace={<Icon>search</Icon>}
                                onClick={() => {
                                    setShowPreview(true)
                                }}
                            />
                        </FlexRow>
                    )}
                </FlexColumn>
            )}
            <input
                type="file"
                ref={ref}
                style={{ display: 'none' }}
                onChange={(event) => {
                    if (event.target.files?.[0]) {
                        FileUtils.fileToBase64(
                            event.target.files[0],
                            (response) => {
                                if (formName && fieldName) {
                                    updateFormProperty(formName, fieldName, {
                                        value: response,
                                        type: 'file',
                                    })
                                    ref.current.value = ''
                                }
                            }
                        )
                    }
                }}
            />
            {showPreview && (
                <Modal
                    title="Visualização de Imagem"
                    onClose={() => {
                        setShowPreview(false)
                    }}
                >
                    <FlexRow
                        style={{ justifyContent: 'center', width: '100%' }}
                    >
                        <img src={content || ''} width={700} />
                    </FlexRow>
                </Modal>
            )}
        </FormLayout>
    )
}

export default PictureField
