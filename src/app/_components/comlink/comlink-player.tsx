import {toValidAllycode} from "../utils";

let player_cache: any = {};
let self: any = {};

export default class ComlinkPlayer {

  constructor() {}

  async getPlayer(ally_code) {
    ally_code = toValidAllycode(ally_code);

    if (player_cache[ally_code]) {
      return player_cache[ally_code];
    }

    const response = await fetch("/api/comlink-player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ally_code: `${ally_code}`,
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch getPlayer (${response.status})`);
    }

    const json = await response.json();
    player_cache[ally_code] = json;
    return json;
  }

  async getPlayerById(playerId) {
    const cachedPlayersArray: any = Object.values(player_cache);
    for (let value of cachedPlayersArray) {
      if (value.playerId !== playerId)
        continue;

      return value;
    }

    const response = await fetch("/api/comlink-player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player_id: `${playerId}`,
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch getPlayerById (${response.status})`);
    }

    const json = await response.json();
    player_cache[toValidAllycode(json.allyCode)] = json;
    return json;
  }

  getSelf(): any {
    return self;
  }

  setSelf(profile) {
    self = profile;
  }

  isLoggedIn(): boolean {
    return self.name !== undefined;
  }

  async getPlayerArena(ally_code) {
    ally_code = toValidAllycode(ally_code);

    const response = await fetch("/api/comlink-player-arena", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ally_code: `${ally_code}`,
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch getPlayerArena (${response.status})`);
    }

    return await response.json();
  }

}