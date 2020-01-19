import chalk from "chalk"
import moment from "moment"

type TLoggerType =
  | "info"
  | "warn"
  | "error"
  | "success"
  | "debug"
  | "fail"
  | "log"
  | string

type TLoggerColor = "blue" | "red" | "green" | "redBright" | "yellow" | "white"

const log = (
  message: string,
  type: TLoggerType = "log",
  color: TLoggerColor = "white"
) => {
  const time = moment().format("hh:mm:ss")
  const info = chalk`[${time}] {${color} [${type}]}`.padEnd(30, " ")
  console.log(`${info} ${message}`)
}

const success = (message: string) => log(message, "success", "green")
const fail = (message: string) => log(message, "fail", "redBright")
const info = (message: string) => log(message, "info", "blue")
const warn = (message: string) => log(message, "warn", "yellow")
const error = (message: string) => log(message, "error", "red")

export default {
  log,
  info,
  warn,
  error,
  success,
  fail
}
