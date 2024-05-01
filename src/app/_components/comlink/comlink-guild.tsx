
// Cached user guilds.
const guilds: any = {};

export default class ComlinkGuild {

  constructor() {}

  async getGuild(guild_id) {
    const response = await fetch("/api/comlink-guild", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guild_id: `${guild_id}`,
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch getGuild (${response.status})`);
    }

    const json = await response.json();
    return json.guild;
  }

  getCachedGuilds(): any {
    return guilds;
  }

  setCachedGuild(guild) {
    guilds[guild.profile.id] = guild;
  }

  async searchGuild(name) {
    const response = await fetch("/api/comlink-guild-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: `${name}`,
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch searchGuild (${response.status})`);
    }

    return await response.json();
  }

}