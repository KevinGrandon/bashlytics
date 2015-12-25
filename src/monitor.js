var debug = require('debug')('bashlytics')
var fs = require('fs')
var utils = require('./utils')
var Table = require('cli-table')

const historyFile = `${utils.homeDir()}/.bash_history`

var table = new Table({
  head: ['Command', 'Count'],
  colWidths: [70, 30]
})

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

  // Output the top 10 used commands.
  commandCounts.slice(0, 10).forEach((val) => table.push(val))
  console.log(table.toString())
})
