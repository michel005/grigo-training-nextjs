import { ExerciseType } from '@/types/exercise.type'
import style from './description.exercise.module.scss'
import { TimeUtils } from '@/utils/time.utils'

export const DescriptionExercise = ({
    exercise,
}: {
    exercise: ExerciseType
}) => {
    return (
        <ul className={style.description}>
            {exercise.type === 'TIME' && (
                <li>
                    Executar por{' '}
                    <b>{TimeUtils.literalTime(exercise.exercise_time)}.</b>
                </li>
            )}
            {exercise.type === 'SERIE' && (
                <li>
                    Executar <b>{exercise.series} séries</b>.
                </li>
            )}
            {exercise.type === 'REPETITION' && (
                <li>
                    Executar <b>{exercise.series} séries</b> de{' '}
                    <b>{exercise.repetitions} repetições</b> cada.
                </li>
            )}
            {exercise.type === 'DROP' && (
                <li>
                    Executar <b>{exercise.series} séries</b> de{' '}
                    <b>{exercise.repetitions} repetições</b> cada.
                </li>
            )}
            {exercise.rest_time && (
                <li>
                    Descanse <b>{TimeUtils.literalTime(exercise.rest_time)}</b>{' '}
                    a cada série.
                </li>
            )}
            {exercise.type === 'DROP' && (
                <li>
                    Ao final executar mais <b>{exercise.drops} repetições</b> em{' '}
                    <b>dropset</b>, sem descanso.
                </li>
            )}
        </ul>
    )
}
