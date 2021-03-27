import { Client, GuildMember, Message } from 'discord.js';
import { IAction, IConfig } from '../utils';
import { sendToChannel, kickFromVoiceChannel } from '.';
import { Action } from './utils/constants';

interface IActionManager {
  bot?: Client;
  config: IConfig;
  message?: Message;
  member?: GuildMember;
  actions: IAction[];
}

export function actionManager(props: IActionManager): void {
  const { bot, message, actions, member, config } = props;
  actions.forEach((ac) => {
    const { action, args } = ac;
    switch (action) {
      case Action.sendToChannel:
        sendToChannel({ args, bot, message, config });
        break;
      case Action.kickFromVoiceChannel:
        kickFromVoiceChannel({ args, member });
        break;
      default:
        console.log('Invalid Action');
    }
  });
}
