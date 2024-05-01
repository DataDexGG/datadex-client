export const SharedStateKeys = {
  LOADING_VIDEO: 'loading_video',
  SELECTED_GUILD: 'selected_guild',
  SELECTED_MEMBER: 'selected_member',
}

const states: any = {};

export default class SharedState {

  constructor() { }

  set(key: string, value: any) {
    states[key] = value;
  }

  get(key: string): any {
    return states[key];
  }
}