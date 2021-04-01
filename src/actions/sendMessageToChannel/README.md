# sendMessageToChannel

Bot sending message to a text channel

## Schema
```
{
  "name": "send message to channel example",
  "action": "sendMessageToChannel",
  "args": {
    "message": "message",
    "channel": "general"
  }
}
```

`action`: sendMessageToChannel

`message`: the message that the bot should send

`channel`: The name of the channel (Optional) (Default: 'general')