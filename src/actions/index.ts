import { Client, Message } from 'discord.js';
import { IAction } from '../utils';
import { sendToChannel } from './sendToChannel';

interface IActionManager {
  bot?: Client;
  message?: Message;
  actions: IAction[];
}

export function actionManager(props: IActionManager): void {
  const { message, actions } = props;
  actions.forEach((ac) => {
    const { action, args } = ac;
    switch (action) {
      case 'sendToChannel':
        sendToChannel({ message, args });
        break;
      default:
        console.log('Invalid Action');
    }
  });
}
