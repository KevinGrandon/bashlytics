module.exports.homeDir = function () {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
