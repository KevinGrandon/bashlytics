[![Dependency Status](https://david-dm.org/KevinGrandon/bashlytics.svg)](https://david-dm.org/KevinGrandon/bashlytics)

# Bashlytics

Bashlyics is a program which monitors terminal usage and reports the most used frequently used commands over time.

## Setup

Place the following content in ~/.bash_profile or ~/.bashrc
```
# Begin Bashlytics
shopt -s histappend
PROMPT_COMMAND="history -a;$PROMPT_COMMAND"
HISTTIMEFORMAT='%F %T %t'
# End Bashlytics
```


## Start the monitoring process:

```
npm start
```


## Viewing stats

You can simply run `./bin/stats.js` at any time to see a table reported in the command line with the most-used stats. The `npm start` command also starts up a webserver and you can view your stats in a browser. By default the site will load at: http://localhost:4567
