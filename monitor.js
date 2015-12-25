var fs = require('fs')
var utils = require('./src/utils')

const historyFile = `${utils.homeDir()}/.bash_history`

fs.watch(historyFile, event => {
  // Only care about change events
  if (event !== 'change') {
  	return
  }
  console.log('got change event', event)
})
