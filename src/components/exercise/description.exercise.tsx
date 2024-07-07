import { ExerciseType } from '@/types/exercise.type'
import style from './description.exercise.module.scss'
import { TimeUtils } from '@/utils/time.utils'

export const DescriptionExercise = ({
    exercise,
}: {
    exercise: ExerciseType
}) => {
    if (exercise.type === 'TIME') {
        if (!exercise.exercise_time) {
            return (
                <ul className={style.description}>
                    <li>
                        Informe o campo <b>Tempo de Execução</b>.
                    </li>
                </ul>
            )
        }

        return (
            <ul className={style.description}>
                <li>
                    Executar por{' '}
                    <b>{TimeUtils.literalTime(exercise.exercise_time)}.</b>
                </li>
                {exercise.rest_time && (
                    <li>
                        Descanse{' '}
                        <b>{TimeUtils.literalTime(exercise.rest_time)}</b> após
                        o exercício.
                    </li>
                )}
            </ul>
        )
    }

    if (exercise.type === 'SERIE') {
        if (!exercise.series) {
            return (
                <ul className={style.description}>
                    <li>
                        Informe o campo <b>Número de Série</b>.
                    </li>
                </ul>
            )
        }

        return (
            <ul className={style.description}>
                <li>
                    Executar <b>{exercise.series} séries</b> com o máximo de
                    repetições.
                </li>
                {exercise.rest_time && (
                    <li>
                        Descanse{' '}
                        <b>{TimeUtils.literalTime(exercise.rest_time)}</b> a
                        cada série.
                    </li>
                )}
            </ul>
        )
    }

    if (exercise.type === 'REPETITION') {
        if (!exercise.series || !exercise.repetitions) {
            return (
                <ul className={style.description}>
                    <li>
                        Informe o campo <b>Número de Série</b>.
                    </li>
                    <li>
                        Informe o campo <b>Número de Repetições</b>.
                    </li>
                </ul>
            )
        }

        return (
            <ul className={style.description}>
                <li>
                    Executar <b>{exercise.series} séries</b> de{' '}
                    <b>{exercise.repetitions} repetições</b> cada.
                </li>
                {exercise.rest_time && (
                    <li>
                        Descanse{' '}
                        <b>{TimeUtils.literalTime(exercise.rest_time)}</b> a
                        cada série.
                    </li>
                )}
            </ul>
        )
    }

    if (exercise.type === 'DROP') {
        if (!exercise.series || !exercise.repetitions || !exercise.drops) {
            return (
                <ul className={style.description}>
                    <li>
                        Informe o campo <b>Número de Série</b>.
                    </li>
                    <li>
                        Informe o campo <b>Número de Repetições</b>.
                    </li>
                    <li>
                        Informe o campo <b>Número de Drop Sets</b>.
                    </li>
                </ul>
            )
        }

        return (
            <ul className={style.description}>
                <li>
                    Executar <b>{exercise.series} séries</b> de{' '}
                    <b>{exercise.repetitions} repetições</b> cada.
                </li>
                {exercise.rest_time && (
                    <li>
                        Descanse{' '}
                        <b>{TimeUtils.literalTime(exercise.rest_time)}</b> a
                        cada série.
                    </li>
                )}
                <li>
                    Ao final executar mais <b>{exercise.drops} repetições</b> em{' '}
                    <b>dropset</b> (diminuindo a carga a cada série), sem
                    descanso.
                </li>
            </ul>
        )
    }

    return <ul className={style.description}></ul>
}
