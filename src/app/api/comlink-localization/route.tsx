import {NextResponse} from "next/server";

const cooldown = 1_000 * 60 * 30;
let localization = undefined;
let lastFetched = 0;

export async function GET(req, res) {
  if (lastFetched + cooldown > Date.now()) {
    return NextResponse.json(localization);
  }

  const response = await fetch("https://raw.githubusercontent.com/swgoh-utils/gamedata/main/Loc_ENG_US.txt.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    NextResponse.json({ status: response.status });
  }

  localization = await response.json();
  lastFetched = Date.now();

  return NextResponse.json(localization);
}
