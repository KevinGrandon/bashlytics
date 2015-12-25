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
  debug('all log content is:', content)
})
