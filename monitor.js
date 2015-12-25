var fs = require('fs')

function homeDir () {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

fs.watch(`${homeDir()}/.bash_history`, event => {
  // Only care about change events
  if (event !== 'change') {
  	return
  }
  console.log('got event!', event)
})
