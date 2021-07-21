const { execSync } = require('child_process')
const express = require('express')

const app = express()

app.get('/addpartkey/:algorandAddress/:daysToParticipate', function (req, res) {
  const lastRoundNumber = Number(execSync('goal node lastround'))

  const approximateNumberOfRoundsInDays =
    Number(req.params.daysToParticipate) * 24 * 3 // allegedly every 20 minutes https://algorand.foundation/rewards-faq
  const approximateRoundNumberSpecifiedDaysFromNow =
    lastRoundNumber + approximateNumberOfRoundsInDays
  const sizeOfParticipationKey = Math.sqrt(approximateNumberOfRoundsInDays)

  // https://developer.algorand.org/docs/run-a-node/participate/generate_keys/#generate-the-participation-key-with-goal
  // https://developer.algorand.org/docs/reference/cli/goal/account/addpartkey/
  res.set('Content-Type', 'text/plain')
  res.send(
    execSync(
      `goal account addpartkey --address=${req.params.algorandAddress} --roundFirstValid=${lastRoundNumber} --roundLastValid=${approximateRoundNumberSpecifiedDaysFromNow} --keyDilution=${sizeOfParticipationKey}`
    )
  )
})

app.get(
  '/changeonlinestatus/:algorandAddress/:onlineBoolean',
  function (req, res) {
    // https://developer.algorand.org/docs/run-a-node/participate/online/#create-an-online-key-registration-transaction
    // https://developer.algorand.org/docs/reference/cli/goal/account/changeonlinestatus/
    res.set('Content-Type', 'text/plain')
    res.send(
      execSync(
        `goal account changeonlinestatus --address=${req.params.algorandAddress} --firstvalid=0 --online=${req.params.onlineBoolean}`
      )
    )
  }
)

app.get('/partkeyinfo', async (req, res) => {
  // https://developer.algorand.org/docs/run-a-node/participate/generate_keys/#view-participation-key-info
  // https://developer.algorand.org/docs/reference/cli/goal/account/partkeyinfo/
  res.set('Content-Type', 'text/plain')
  res.send(execSync('goal account partkeyinfo'))
})

app.get('/start', async (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send(execSync('goal node start -d `echo $ALGORAND_DATA`'))
})

app.get('/status', async (req, res) => {
  // https://developer.algorand.org/docs/reference/cli/goal/node/status/
  res.set('Content-Type', 'text/plain')
  res.send(execSync('goal node status'))
})

app.get('/stop', async (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send(execSync('goal node stop'))
})

app.listen(3048, () => console.log(`HTTP listening on ${3048}`))

// const shutdown = () => execSync('')
// process.on('SIGINT', shutdown)
// process.on('SIGTERM', shutdown)
