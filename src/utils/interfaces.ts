import { Event } from '.';

export interface IEventArg {
  ignoreCase?: boolean;
  message?: string;
  member?: string;
}
export interface IActionArg {
  message?: string;
  member?: string;
}
export interface IAction {
  name?: string;
  action: string;
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
  textChannelId: string;
}
