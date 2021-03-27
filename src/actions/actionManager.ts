import { Guild } from 'discord.js';
import { IPayloadAction, IConfig } from '../utils';
import { sendToChannel, kickFromVoiceChannel } from '.';
import { Action } from './utils/constants';

interface IActionManager {
  config: IConfig;
  guild: Guild;
  actions: IPayloadAction[];
}

export function actionManager(props: IActionManager): void {
  const { guild, actions, config } = props;
  actions.forEach((ac) => {
    const { action, args } = ac;
    switch (action) {
      case Action.kickFromVoiceChannel:
        kickFromVoiceChannel({ args, guild, config });
        break;
      case Action.sendToChannel:
        sendToChannel({ args, guild, config });
        break;
      default:
        console.log('Invalid Action');
    }
  });
}
