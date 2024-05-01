import ComlinkPlayer from "./comlink-player";
import ComlinkGeneral from "./comlink-general";
import ComlinkEvent from "./comlink-event";
import ComlinkGuild from "./comlink-guild";
import ComlinkPlayerHelper from "./comlink-player-helper";

const General = new ComlinkGeneral();
const Player = new ComlinkPlayer();
const Guild = new ComlinkGuild();
const Event = new ComlinkEvent();
const PlayerHelper = new ComlinkPlayerHelper();

export default function useComlink() {
  return {
    getEnums: General.getEnums,
    getMetadata: General.getMetadata,
    getLocalization: General.getLocalization,
    getPortraits: General.getPortraits,
    getTitles: General.getTitles,
    getSkills: General.getSkills,
    getUnits: General.getUnits,
    getPlayer: Player.getPlayer,
    getPlayerById: Player.getPlayerById,
    getSelf: Player.getSelf,
    setSelf: Player.setSelf,
    isLoggedIn: Player.isLoggedIn,
    getPlayerArena: Player.getPlayerArena,
    getGuild: Guild.getGuild,
    getCachedGuilds: Guild.getCachedGuilds,
    setCachedGuild: Guild.setCachedGuild,
    searchGuild: Guild.searchGuild,
    PlayerHelper: PlayerHelper,
  };
}