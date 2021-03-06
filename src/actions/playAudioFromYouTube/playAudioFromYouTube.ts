import { IActionProps } from '..';
import { VoiceChannel } from 'discord.js';
import ytdl from 'discord-ytdl-core';

export function playAudioFromYouTube(props: IActionProps): void {
  const { guild, args, event } = props;
  const { member: eventMember } = event.args;
  const { channel, url } = args;
  let { start, stop } = args;
  start = start || 0;
  stop = stop || Infinity;
  if (start > stop) return;
  let chosenChannel;
  if (channel) {
    chosenChannel = guild.channels.cache.find((c) => c.name === channel) as VoiceChannel;
  } else {
    chosenChannel = guild.channels.cache.find(
      (c) => c.type === 'voice' && c.members.find((m) => m.user.tag === eventMember),
    );
  }
  const stream = ytdl(url, {
    filter: 'audioonly',
    opusEncoded: false,
    fmt: 'mp3',
    encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200'],
    seek: start ? start : undefined,
  });
  chosenChannel.join().then((connection) => {
    if (stop !== Infinity) {
      stop = stop - start;
      setTimeout(() => {
        chosenChannel.leave();
      }, stop * 1000);
    }
    connection
      .play(stream, {
        type: 'unknown',
      })
      .on('finish', () => {
        chosenChannel.leave();
      });
  });
}
