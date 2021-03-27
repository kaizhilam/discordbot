# discordbot

Just a simple Discord bot

## Getting Started

### Prerequisites
1. Node

### Installing

1. Create a `.env` file on the root directory and place your token value
```
TOKEN=[TOKEN HERE]
GUILD_ID=[GUILD ID HERE]
SCHEMA_HOST=[ENDPOINT]
PORT=[PORT]
```
2. Install all dependencies `npm install`
3. Build packages `npm run build`
4. Start the bot `npm run start`

### Useage

1. Send a POST request to SCHEMA_HOST:PORT with schema for body

### Example schema

```
[
    {
        "name": "Hello World",
        "event": "message",
        "args": {
            "message": "hello",
        },
        "actions": [
            {
                "name": "reply world",
                "action": "sendToChannel",
                "args": {
                    "message": "World"
                }
            }
        ]
    }
]
```

### Example .env

```
TOKEN=AAAABBBBCCCCDDDD1111222233334444
GUILD_ID=1234567890
SCHEMA_HOST=http://localhost
PORT=3000
```


### Running the tests

1. Start the test `npm run test`
2. Coverage should be in `coverage\lcov-report\index.html`

### Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md)
### Deployment

tbc

### Authors

- Kai Zhi Lam