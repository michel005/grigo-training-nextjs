import { GoogleIcons } from '@/types/GoogleIcons'
import { useState } from 'react'
import Bag from '../bag'
import Button from '../button'
import ButtonGroup from '../buttonGroup'
import { Icon } from '../icon'
import Skeleton from '../skeleton'
import FlexColumn from './flexColumn'
import FlexRow from './flexRow'
import FormLayout from './formLayout'
import Grid from './grid'

interface HeaderTabsContentType {
    loading?: boolean
    header?: {
        picture?: React.ReactNode
        title: string
        description?: string
        details: [string, React.ReactNode][]
    }
    tabs?: {
        [key: string]: {
            bag?: string | number
            icon?: GoogleIcons
            label: string
        }
    }
    children?: (currentTab: string) => React.ReactNode
}

const HeaderTabsContent = ({
    loading = false,
    header,
    tabs,
    children,
}: HeaderTabsContentType) => {
    const [currentTab, setCurrentTab] = useState<string | null>(
        Object.keys(tabs || {})?.[0]
    )

    if (loading) {
        return (
            <FlexColumn className="componentHeaderTabsContent">
                <FlexColumn className="componentHeaderTabsContent__headerAndTabs">
                    {header && (
                        <FlexRow className="componentHeaderTabsContent__headerAndTabs__header">
                            <Skeleton height={200} width={200} />
                            <FlexColumn style={{ gap: '10px', width: '100%' }}>
                                <Skeleton height={20} />
                                <Skeleton height={14} />
                                <Skeleton height={200 - 20 - 20 - 14} />
                            </FlexColumn>
                        </FlexRow>
                    )}
                    <Skeleton height={40} />
                </FlexColumn>
                <FormLayout>
                    {currentTab && children && children?.(currentTab)}
                </FormLayout>
            </FlexColumn>
        )
    }

    return (
        <FlexColumn className="componentHeaderTabsContent">
            <FlexColumn className="componentHeaderTabsContent__headerAndTabs">
                {header && (
                    <FlexRow responsive={true}>
                        {header?.picture}
                        <FlexColumn style={{ gap: '10px' }}>
                            <h3>{header.title}</h3>
                            {header.description && (
                                <p
                                    style={{
                                        color: '#aaa',
                                        marginBottom: '4px',
                                    }}
                                >
                                    {header.description}
                                </p>
                            )}
                            <FlexColumn style={{ gap: '4px' }}>
                                {header.details.map((detail, key) => {
                                    return (
                                        <Grid
                                            columnTemplate="110px 1fr"
                                            key={key}
                                        >
                                            {detail[0] ? (
                                                <b>{detail[0]}</b>
                                            ) : (
                                                <span />
                                            )}
                                            <p>{detail[1]}</p>
                                        </Grid>
                                    )
                                })}
                            </FlexColumn>
                        </FlexColumn>
                    </FlexRow>
                )}
                <ButtonGroup className="componentHeaderTabsContent__headerAndTabs__tabs">
                    {Object.keys(tabs || {})
                        .map((tab) => ({
                            ...tabs?.[tab],
                            tab: tab,
                        }))
                        .map((tab) => {
                            return (
                                <Button
                                    key={tab.tab}
                                    leftSpace={
                                        tab.icon && <Icon>{tab.icon}</Icon>
                                    }
                                    rightSpace={
                                        tab.bag && (
                                            <Bag
                                                variant={
                                                    currentTab === tab.tab
                                                        ? 'primary'
                                                        : 'secondary'
                                                }
                                            >
                                                {tab.bag}
                                            </Bag>
                                        )
                                    }
                                    onClick={() => {
                                        setCurrentTab(tab.tab)
                                    }}
                                    variant={
                                        currentTab === tab.tab
                                            ? 'primary'
                                            : 'secondary'
                                    }
                                >
                                    {tab.label}
                                </Button>
                            )
                        })}
                </ButtonGroup>
            </FlexColumn>
            <FormLayout>
                {currentTab && children && children(currentTab)}
            </FormLayout>
        </FlexColumn>
    )
}

export default HeaderTabsContent
