import Button from './button'
import ButtonGroup from './buttonGroup'

interface TabsType {
    options: {
        [key: string]: {
            label: string
        }
    }
    value: string
    onChange: (val: string) => void
}

const Tabs = ({ options, value, onChange }: TabsType) => {
    const allOptions = Object.keys(options).map((x) => ({
        option: x,
        ...options[x],
    }))
    return (
        <ButtonGroup>
            {allOptions.map((option) => (
                <Button
                    key={option.option}
                    onClick={() => {
                        onChange(option.option)
                    }}
                    variant={value === option.option ? 'primary' : 'secondary'}
                >
                    {option.label}
                </Button>
            ))}
        </ButtonGroup>
    )
}

export default Tabs
