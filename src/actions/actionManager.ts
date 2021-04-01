import { Guild } from 'discord.js';
import { IConfig, IAction } from '../utils';
import {
  kickFromVoiceChannel,
  movePersonFromVoiceChannelToAnother,
  playAudioFromYouTube,
  sendMessageToChannel,
} from '.';
import { Action } from './utils';

interface IActionManager {
  config: IConfig;
  guild: Guild;
  actions: IAction[];
}

export function actionManager(props: IActionManager): void {
  const { guild, actions, config } = props;
  actions.forEach((ac) => {
    const { action, args } = ac;
    switch (action) {
      case Action.kickFromVoiceChannel:
        kickFromVoiceChannel({ args, guild, config });
        break;
      case Action.movePersonFromVoiceChannelToAnother:
        movePersonFromVoiceChannelToAnother({ args, guild, config });
        break;
      case Action.playAudioFromYouTube:
        playAudioFromYouTube({ args, guild, config });
        break;
      case Action.sendMessageToChannel:
        sendMessageToChannel({ args, guild, config });
        break;
      default:
        console.log('Invalid Action');
    }
  });
}
