export const ListStates = {
  DASHBOARD: { key: 'dashboard', requiresLogin: false },
  GUILD_MEMBERS: { key: 'guild_members', requiresLogin: false },
}

export const ContentStates = {
  SIGNUP: { key: 'signup', requiresLogin: false },
  SWGOH_HOME: { key: 'swgoh_home', requiresLogin: false },
  PATCH_NOTES: { key: 'patch_notes', requiresLogin: true },
  GL_PROGRESS: { key: 'gl_progress', requiresLogin: true },
  SOMETHING_HERE: { key: 'something_here' },
  GUILD_HOME: { key: 'guild_home' },
}

let content = ContentStates.SWGOH_HOME;
let list = ListStates.DASHBOARD;

export default class PageState {

  constructor() { }

  getContentPage() {
    return content;
  }

  setContentPage(state) {
    content = state;
  }

  getListPage() {
    return list;
  }

  setListPage(state) {
    list = state;
  }
}