# discordbot

Just a simple Discord bot

## Getting Started

### Prerequisites
1. Node
2. Discord account
3. schema channel on a Discord guild

### Installing

1. Create a `.env` file on the root directory and place your token value
```
TOKEN=[TOKEN HERE]
GUILD_ID=[GUILD ID HERE]
SCHEMA_CHANNEL_ID=[SCHEMA CHANNEL ID HERE]
```
2. Install all dependencies `npm install`
3. Build packages `npm run build`
4. Start the bot `npm run start`

### Usage

1. Write a valid schema on the schema channel

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
TOKEN=aaabbbcccddd111222333444
GUILD_ID=123456789
SCHEMA_CHANNEL_ID=123456789

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