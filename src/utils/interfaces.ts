import { Event } from '.';
import { Action } from '../actions';

export interface IEventArg {
  ignoreCase?: boolean;
  message?: string;
  member?: string;
  channel?: string;
}
export interface IActionArg {
  channel?: string;
  message?: string;
  member?: string;
  random?: boolean;
  url?: string;
}
export interface IAction {
  name?: string;
  action: Action;
  args: IActionArg;
}
export interface IPayload {
  name?: string;
  event: Event;
  args?: IEventArg;
  actions: IAction[];
}
export interface IConfig {
  token: string;
  guildId: string;
  schemaChannelId: string;
}
