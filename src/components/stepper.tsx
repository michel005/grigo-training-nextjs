import React, { useState } from 'react'
import Button from './button'
import { Icon } from './icon'
import FlexRow from './layout/flexRow'

interface StepperType {
    header?: (step: number, setStep: (s: number) => void) => React.ReactNode
    children: (step: number, setStep: (s: number) => void) => React.ReactNode
    maxSteps: number
    lastStepButton?: (
        step: number,
        setStep: (s: number) => void
    ) => React.ReactNode
}

const Stepper = ({
    header,
    children,
    maxSteps,
    lastStepButton,
}: StepperType) => {
    const [step, setStep] = useState(0)

    return (
        <div className="componentStepper">
            {header && <header>{header?.(step, setStep)}</header>}
            <div className="componentStepper__content">
                {children(step, setStep)}
            </div>
            <footer>
                <Button
                    variant="secondary"
                    disabled={!(step > 0)}
                    onClick={() => setStep((x) => x - 1)}
                    leftSpace={<Icon>keyboard_arrow_left</Icon>}
                    style={{
                        opacity: !(step > 0) ? 0 : 1,
                        pointerEvents: !(step > 0) ? 'none' : 'auto',
                    }}
                >
                    Anterior
                </Button>
                <FlexRow className="componentStepper__allDots">
                    {new Array(maxSteps).fill(null).map((_, index) => {
                        return (
                            <span
                                onClick={() => {
                                    setStep(index)
                                }}
                                className={`componentStepper__dot ${index === step && 'componentStepper__currentDot'}`}
                                key={index}
                            />
                        )
                    })}
                </FlexRow>
                {(!(step < maxSteps - 1) && !!lastStepButton && (
                    <>{lastStepButton(step, setStep)}</>
                )) || (
                    <Button
                        variant="secondary"
                        disabled={!(step < maxSteps - 1)}
                        onClick={() => setStep((x) => x + 1)}
                        rightSpace={<Icon>keyboard_arrow_right</Icon>}
                    >
                        Próximo
                    </Button>
                )}
            </footer>
        </div>
    )
}

export default Stepper
