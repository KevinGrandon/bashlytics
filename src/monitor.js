var debug = require('debug')('bashlytics')
var fs = require('fs')
var utils = require('./utils')

const historyFile = `${utils.homeDir()}/.bash_history`

fs.watch(historyFile, event => {
  // Only care about change events
  if (event !== 'change') {
  	return
  }
  debug('got change event')

  var content = fs.readFileSync(historyFile, 'utf-8')
    .split('\n')

  // A list of commands and their counts.
  // Structure: [command, count]
  var commandCounts = []

  // A mapping of all commands to counts
  var commandMap = {}

  content.forEach(line => {
    if (line.startsWith('#')) {
      return
    }
    commandMap[line] = commandMap[line] || 1
    commandMap[line]++
  })

  for (var i in commandMap) {
    commandCounts.push([
      i,
      commandMap[i]
    ])
  }

  // Sort all commands from most -> least used
  commandCounts.sort((a, b) => b[1] - a[1])

  // Output the top 10 used commands.
  console.log('top 10 commands: ', commandCounts.slice(0, 10))
})
