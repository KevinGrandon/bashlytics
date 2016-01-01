var fs = require('fs')
var utils = require('./utils')

const STRIP_QUOTED = true;
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

    // Strip any quoted text if necessary.
    // This is so we can count `git commit "Some Message"` as a `git commit` command.
    // I'm sure this will cause some false-positives, but it's a simple solution for now.
    if (STRIP_QUOTED) {
      line = line.replace(/".*"/g, '')
    }

    line = line.substring(0, 60)
    line = line.trim()

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
