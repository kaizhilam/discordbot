# Message

This event will trigger whenever someone sent a message

## Schema
```
{
  "name": "message",
  "event": "message",
  "args": {
    "message": "message",
    "ignoreCase": true
  },
  "actions": [...]
}
```

`event`: message

`message`: The message which the bot will compare

`ignoreCase`: ignore the case for message (Optional) (Default: true)

