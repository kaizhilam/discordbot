import { IPayloadActionArg, IConfig } from '../../utils';
import { Guild } from 'discord.js';

export interface IAction {
  args: IPayloadActionArg;
  guild: Guild;
  config: IConfig;
}
