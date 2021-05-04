import { makeAutoObservable } from 'mobx';

// TODO: this is temp, just for dev - will eventually be moved to generated client models
export interface IChannel {
  id: string;
  name: string;
  slug: string;
}

export class ChannelStore {
  public channels: IChannel[] = [
    {
      id: '1',
      name: 'General',
      slug: 'general',
    },
    {
      id: '2',
      name: 'Food and Supplies',
      slug: 'food-and-supplies',
    },
  ];

  public constructor() {
    makeAutoObservable(this);
  }
}

export const channelStore = new ChannelStore();
