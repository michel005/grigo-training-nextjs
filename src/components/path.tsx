'use client'

import { GoogleIcons } from '@/types/GoogleIcons'
import { useRouter } from 'next/navigation'
import Button from './button'
import { Icon } from './icon'

interface PathType {
    values: {
        name: string
        path?: string
        icon?: GoogleIcons
    }[]
}

const Path = ({ values }: PathType) => {
    const router = useRouter()

    return (
        <div className="componentPath">
            {values.map((value, valueKey) => {
                if (valueKey === values.length - 1) {
                    return (
                        <div key={valueKey} className="componentPath__pathName">
                            {value.icon && <Icon>{value.icon}</Icon>}
                            {value.name}
                        </div>
                    )
                } else {
                    return (
                        <Button
                            key={valueKey}
                            leftSpace={value.icon && <Icon>{value.icon}</Icon>}
                            rightSpace={
                                <Icon style={{ marginLeft: '14px' }}>
                                    keyboard_arrow_right
                                </Icon>
                            }
                            variant="link"
                            onClick={() => {
                                router.push(value.path || '')
                            }}
                        >
                            {value.name}
                        </Button>
                    )
                }
            })}
        </div>
    )
}

export default Path
