# Message

This event will trigger whenever someone sent a message

## Schema
```
{
  "name": "message",
  "event": "message",
  "args": {
    "channel": "general",
    "member": "aaa#111",
    "message": "message",
    "ignoreCase": true
  },
  "actions": [...]
}
```

`event`: message

`channel`: The channel which the message is written in (Optional) (Default: any)

`member`: The author of the message (Optional) (Default: any)

`message`: The message which the bot will compare

`ignoreCase`: ignore the case for message (Optional) (Default: true)

