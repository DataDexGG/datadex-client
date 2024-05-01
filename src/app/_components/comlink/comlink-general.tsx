// import localization from './../../../../data/Loc_ENG_US.txt.json';
// import enums from './../../../../data/enums.json';
// import guildBanner from './../../../../data/guildBanner.json';
// import playerPortrait from './../../../../data/playerPortrait.json';
// import playerTitle from './../../../../data/playerTitle.json';
// import skill from './../../../../data/skill.json';
// import units from './../../../../data/units.json';

export default class ComlinkGeneral {

  constructor() {}

  getEnums(): any {
    return {}//enums;
  }

  async getMetadata() {
    const response = await fetch("/api/comlink-metadata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch getMetadata (${response.status})`);
    }

    return await response.json();
  }

  getLocalization(): any {
    return {}//localization;
  }

  getPortraits(): any {
    return {}//playerPortrait;
  }

  getTitles(): any {
    return {}//playerTitle;
  }

  getSkills(): any {
    return {}//skill;
  }

  getUnits(): any {
    return {}//units;
  }
}