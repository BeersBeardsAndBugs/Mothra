import { MMM } from '../constants'

const dateTimeValues = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const day = now.getDate()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const seconds = now.getSeconds()

    return { year, month, day, hour, minute, seconds }
}

const leftPadZero = (number) => {
    if (number < 10) {
        return `0${number}`
    }
    return number
}

export const dateTimeNowText = () => {
    let { year, month, day, hour, minute, seconds } = dateTimeValues()

    const textMonth = MMM[month]
    const paddedDay = leftPadZero(day)
    const paddedHour = leftPadZero(hour)
    const paddedMinute = leftPadZero(minute)
    const paddedSeconds = leftPadZero(seconds)

    return `${paddedDay}-${textMonth}-${year} ${paddedHour}-${paddedMinute}-${paddedSeconds}`
}
