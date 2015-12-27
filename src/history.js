var fs = require('fs')
var utils = require('./utils')

const historyFile = `${utils.homeDir()}/.bash_history`

module.exports.file = historyFile

module.exports.getAndOrderCommands = function () {
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
    line = line.substring(0, 60)
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

  return commandCounts
}
