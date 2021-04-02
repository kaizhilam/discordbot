import { Guild } from 'discord.js';
import { IConfig, IAction, IPayload } from '../../utils';
import {
  kickFromVoiceChannel,
  movePersonFromVoiceChannelToAnother,
  playAudioFromYouTube,
  sendMessageToChannel,
  Action,
} from '..';

interface IActionManager {
  config: IConfig;
  guild: Guild;
  actions: IAction[];
  event: IPayload;
}

export function actionManager(props: IActionManager): void {
  const { guild, actions, config, event } = props;
  actions.forEach((ac) => {
    const { action, args } = ac;
    switch (action) {
      case Action.kickFromVoiceChannel:
        kickFromVoiceChannel({ args, guild, config, event });
        break;
      case Action.movePersonFromVoiceChannelToAnother:
        movePersonFromVoiceChannelToAnother({ args, guild, config, event });
        break;
      case Action.playAudioFromYouTube:
        playAudioFromYouTube({ args, guild, config, event });
        break;
      case Action.sendMessageToChannel:
        sendMessageToChannel({ args, guild, config, event });
        break;
      default:
        console.log('Invalid Action');
    }
  });
}
