import {NextResponse} from "next/server";

const cooldown = 1_000 * 60 * 30;
let portraits = undefined;
let lastFetched = 0;

export async function GET(req, res) {
  if (lastFetched + cooldown > Date.now()) {
    return NextResponse.json(portraits);
  }

  const url = "https://raw.githubusercontent.com/swgoh-utils/gamedata/main/playerPortrait.json";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    NextResponse.json({ status: response.status });
  }

  portraits = await response.json();
  lastFetched = Date.now();

  return NextResponse.json(portraits);
}
