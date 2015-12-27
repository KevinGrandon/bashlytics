var Table = require('cli-table')

var history = require('./history')

module.exports.generateCommandTable = function () {
  var table = new Table({
    head: ['Command', 'Count'],
    colWidths: [70, 30]
  })

  var commandCounts = history.getAndOrderCommands()

  // Output the top 10 used commands.
  commandCounts.slice(0, 10).forEach((val) => table.push(val))
  console.log(table.toString())
}
