import { appendFileSync, readFileSync, writeFileSync } from 'fs'

const formatDate = (date: Date): string => {
  const a = [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map(function (n) { return n.toString().padStart(2, '0'); })
    .join(':');

  const b = [date.getDay(), date.getMonth() + 1, date.getFullYear()]
    .map(function (n) { return n.toString().padStart(2, '0'); })
    .join('-');

  return `${b}` + ' ' + `${a}`;
};

const writeOnLog = async (result: string) => {

  if (result == 'iniciando...') {
    writeFileSync('./src/logs/errorLog.log', '');
    return console.log('Started Log!')
  }

  const hour = await formatDate(new Date())

  appendFileSync('./src/logs/errorLog.log', `\n${hour} ${result}`)

  return console.log('Updated!');
}

const logContent = async (): Promise<string | Buffer> => {

  const data = readFileSync('./src/logs/errorLog.log')

  if (data.length <= 0) return 'Log de erros vazia.'

  return data;
}

const discloud = {

  log: async (): Promise<{ bot_id: string, link: string, logs: string}> => {
    const fetch = require('node-fetch')

    const data = await fetch(`https://discloud.app/status/bot/668659864171708448/logs`, {
      headers: {
        "api-token": `${process.env.DISCLOUD_TOKEN}`
      }
    })

    return data.json()
  },

  bot: async (): Promise<{bot_id: string, info: string, container: string, cpu: string, memory: string, last_restart: string}> => {
    const fetch = require('node-fetch')

    const data = await fetch(`https://discloud.app/status/bot/668659864171708448`, {
      headers: {
        "api-token": `${process.env.DISCLOUD_TOKEN}`
      }
    })

    return data.json()
  },

  authorBot: async (): Promise<{ userID: string, plan: string, lastDataLeft: string, planDataEnd: string}> => {

    const fetch = require('node-fetch')

    const data = await fetch(`https://discloud.app/status/user`, {
      headers: {
        "api-token": `${process.env.DISCLOUD_TOKEN}`
      }
    })

    return data.json()
  }
}

export { formatDate, writeOnLog, logContent, discloud }