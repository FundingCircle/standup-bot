const getProperty = (propertyName: string): string =>
  PropertiesService.getScriptProperties().getProperty(propertyName)

const selectAtRandom = (list: string[]): string =>
  list[Math.floor(Math.random() * list.length)]

const nextWorkingDay = (): Date => {
  const today: Date = new Date()
  const offset: number = today.getDay() === 5 ? 3 : 1
  return new Date(today.setDate(today.getDate() + offset))
}

const allPeople = (): string[] =>
  SpreadsheetApp
    .openById(getProperty("SPREADSHEET_ID"))
    .getSheetByName("team")
    .getDataRange()
    .getValues()
    .map(p => p[0].toString())

const tomorrowAsString = (): string =>
  ["Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"][nextWorkingDay().getDay()]

const sendMessage = (message): void => {
  const payload: object = {
    "channel": getProperty("SLACK_CHANNEL_NAME"),
    "username": "Bear Bot",
    "icon_emoji": ":bear:",
    "link_names": 1,
    "text": message   }
  const url: string = getProperty("SLACK_INCOMING_URL")
  const options: object = {
    "method": "post",
    "payload": JSON.stringify(payload)
  }
  UrlFetchApp.fetch(url, options)
}

function standup (): void {
  const person: string = selectAtRandom(allPeople())
  const message: string = `The master of ceremonies for ${tomorrowAsString()}'s standup is: @${person}`
  sendMessage(message)
}

function createTriggers (): void {
  const days = [ScriptApp.WeekDay.MONDAY,
    ScriptApp.WeekDay.TUESDAY,
    ScriptApp.WeekDay.WEDNESDAY,
    ScriptApp.WeekDay.THURSDAY,
    ScriptApp.WeekDay.FRIDAY]
  days.forEach(day => ScriptApp.newTrigger("sendMessage")
    .timeBased().onWeekDay(day)
    .atHour(10).create())
}
