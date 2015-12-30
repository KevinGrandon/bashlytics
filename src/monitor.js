var debug = require('debug')('bashlytics')
var fs = require('fs')
var history = require('./history')
var terminal = require('./terminal')

fs.watch(history.file, event => {
  // Only care about change events
  if (event !== 'change') {
  	return
  }
  debug('got change event')
  terminal.generateCommandTable()
})

// Webserver logic to view stats in a browser.
const Hapi = require('hapi')

const server = new Hapi.Server();
server.connection({ port: 4567 })

server.register(require('vision'), (err) => {
  if (err) {
      throw err
  }

  server.views({
    engines: { html: require('handlebars') },
    path: __dirname + '/templates'
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      var commandCounts = history.getAndOrderCommands()
      reply.view('index', {
        commands: commandCounts
      })
    }
  })
})

server.start(() => {
  console.log('Server running at:', server.info.uri)
})
