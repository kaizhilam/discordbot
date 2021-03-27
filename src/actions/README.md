# Actions

Action is what the bot is able to do on the guild. ActionManager handles all the actions from the payload and calls the appropriate action

## Constructing README.md

Use the format below

# [name of action]

[description of action]

## Schema
```
{
  "name": "name",
  "action": "action",
  "args": {
    "arg1": "arg1",
    "arg2": "arg2",
    ...
    "argn": "argn"
  }
}
```

`action`: [name]

`arg1`: [arg1 description]

`arg2`: [arg2 description] (Optional) (Default: 'default')

...

`argn`: [argn description]
