import { IActionProps } from '..';
import { VoiceChannel } from 'discord.js';
import ytdl from 'discord-ytdl-core';

export function playAudioFromYouTube(props: IActionProps): void {
  const { guild, args } = props;
  const { channel, url } = args;
  const chosenChannel = guild.channels.cache.find((c) => c.name === channel) as VoiceChannel;
  const stream = ytdl(url, {
    filter: 'audioonly',
    opusEncoded: true,
    encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200'],
  });
  chosenChannel.join().then((connection) => {
    connection
      .play(stream, {
        type: 'opus',
      })
      .on('finish', () => {
        chosenChannel.leave();
      });
  });
}
