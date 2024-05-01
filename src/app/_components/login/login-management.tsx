"use client";

import { getCookie, setCookie, hasCookie, deleteCookie } from 'cookies-next';
import {useEffect} from "react";
import {decrypt, encrypt} from "../util/encryption";
import useAccount from "../account/account";
import useComlink from "../comlink/comlink";
import useStateManager from "../state/state-manager";
import {ContentStates} from "../state/page-state";
import {SharedStateKeys} from "../state/shared-state";

const REFRESH_TOKEN_KEY = "token_refresh";

export function updateRefreshToken(user_id, ally_code) {
  setCookie(REFRESH_TOKEN_KEY, encrypt(JSON.stringify({
    created_at: Date.now(),
    expires_at: Date.now() + (1_000 * 60 * 60 * 24 * 30),
    key: process.env.NEXT_PUBLIC_COOKIE_KEY,
    rand: Math.random(),
    user_id,
    ally_code,
  })));
}

export default function LoginManagement(props) {
  const { update } = props;
  const { PageState } = useStateManager();
  const { setAccount } = useAccount();
  const { getPlayer, getGuild, setSelf, setCachedGuild } = useComlink();

  useEffect(() => {
    if (!hasCookie(REFRESH_TOKEN_KEY))
      return;

    const refreshCookie = getCookie(REFRESH_TOKEN_KEY);
    const refreshData = JSON.parse(decrypt(refreshCookie));

    if (Date.now() > refreshData.expires_at) {
      deleteCookie(REFRESH_TOKEN_KEY);
      return;
    }

    const user_id = refreshData.user_id;
    const ally_code = refreshData.ally_code;

    updateRefreshToken(user_id, ally_code);

    // Set account, this is the database 'user'.
    setAccount(user_id, ally_code);

    (async () => {
      const player = await getPlayer(ally_code);
      setSelf(player);

      const guild_id = player.guildId;
      if (guild_id && guild_id.length > 0) {
        const guild = await getGuild(guild_id);
        setCachedGuild(guild);
      }

      PageState.setContentPage(ContentStates.PATCH_NOTES);
      update();
    })();
  }, []);

  return null;
}