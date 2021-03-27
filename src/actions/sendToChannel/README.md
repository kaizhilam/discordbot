# Send to channel

Bot sending message to a text channel

## Schema
```
{
  "name": "send to channel example",
  "action": "sendToChannel",
  "args": {
    "message": "message",
    "channel": "general"
  }
}
```

`action`: sendToChannel

`message`: the message that the bot should send

`channel`: The name of the channel (Optional) (Default: 'general')