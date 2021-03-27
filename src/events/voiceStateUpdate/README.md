# VoiceStateUpdate

This event will trigger whenever there is a change of state in the voice channel. There are 2 different event the bot will listen to, `onVoiceChannelConnect` and `onVoiceChannelDisconnect`.

# onVoiceChannelConnect

This event will trigger whenever someone joins a voice channel

## Schema
```
{
  "name": "message",
  "event": "onVoiceChannelConnect",
  "args": {
      "member": "name#111"
    },
  "actions": [...]
}
```

`event`: onVoiceChannelConnect

`member`: name and tag of the person's discord profile

# onVoiceChannelDisonnect

This event will trigger whenever someone leaves a voice channel


## Schema
```
{
  "name": "message",
  "event": "onVoiceChannelDisonnect",
  "args": {
      "member": "name#111"
    },
  "actions": [...]
}
```

`event`: onVoiceChannelDisonnect

`member`: name and tag of the person's discord profile
