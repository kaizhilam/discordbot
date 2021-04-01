import { Client, Guild } from 'discord.js';
import { IConfig, IPayload } from '../../utils';

export interface IEventProps {
  bot: Client;
  payloads: IPayload[];
  config: IConfig;
  guild: Guild;
}
