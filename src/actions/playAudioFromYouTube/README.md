# playAudioFromYouTube

Bot joining a channel and playing the audio from YouTube

## Schema
```
{
  "name": "Play audio from YouTube example",
  "action": "playAudioFromYouTube",
  "args": {
    "channel": "General",
    "url": "http://www.youtube.com/watch?v=12345"
  }
}
```

`action`: playAudioFromYouTube

`channel`: The name of the channel

`start`: Start time of the audio in seconds (Optional)

`stop`: Stop time of the audio in seconds. Will have some delay issue (Optional)

`url`: The URL for the YouTube video