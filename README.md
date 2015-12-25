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

