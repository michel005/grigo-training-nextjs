'use client'

import { CacheContext } from '@/store/cache.context'
import { StringUtils } from '@/utils/stringUtils'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { CSSProperties } from 'styled-components'
import { Icon } from './icon'

interface PictureType {
    alt?: string
    afterLoad?: (response: string) => void
    className?: string
    picture?: string
    size?: number
    variant?: 'rounded' | 'circle' | 'square'
}

const Picture = ({
    alt,
    afterLoad,
    className,
    picture,
    size = 200,
    variant = 'square',
}: PictureType) => {
    const { value: cacheValue, update } = useContext(CacheContext)
    const [value, setValue] = useState<string | undefined>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (picture && cacheValue(picture)) {
            setValue(cacheValue(picture) || '')
            afterLoad?.(cacheValue(picture) || '')
            setLoading(false)
        } else if (picture?.startsWith('http')) {
            // PictureBusiness.getBase64(picture).then((response: string) => {
            //     setValue(response)
            //     update(picture, response)
            //     afterLoad?.(response)
            //     setLoading(false)
            // })

            setValue(picture)
            update(picture, picture)
            afterLoad?.(picture)
            setLoading(false)
        } else {
            setValue(picture)
            afterLoad?.(picture || '')
            setLoading(false)
        }
    }, [picture])

    if (loading) {
        return (
            <div
                title={alt}
                className={`componentPicture ${variant} loading ${className}`}
                style={
                    {
                        '--size': `${size}px`,
                    } as CSSProperties
                }
            >
                <Icon>progress_activity</Icon>
            </div>
        )
    }

    if (!value) {
        if (alt) {
            return (
                <div
                    title={alt}
                    className={`componentPicture ${variant} componentPicture_withAlt ${className}`}
                    style={
                        {
                            '--size': `${size}px`,
                        } as CSSProperties
                    }
                >
                    <span>
                        {StringUtils.initialLetters(alt.toUpperCase() || '')}
                    </span>
                </div>
            )
        }
        return (
            <div
                title={alt}
                className={`componentPicture ${variant} ${className}`}
                style={
                    {
                        '--size': `${size}px`,
                    } as CSSProperties
                }
            >
                <Icon>person</Icon>
            </div>
        )
    }

    return (
        <Image
            title={alt}
            className={`componentPicture ${variant} ${className}`}
            alt={alt || ''}
            src={value || ''}
            width={size}
            height={size}
            style={
                {
                    '--size': `${size}px`,
                } as CSSProperties
            }
        />
    )
}

export default Picture
