import {NextResponse} from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const guild_id = body.guild_id;

  const response = await fetch("http://127.0.0.1:3020/guild", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "payload":{
        "guildId": `${guild_id}`,
        "includeRecentGuildActivityInfo": true
      },
      "enums": true,
    })
  });

  if (!response.ok) {
    NextResponse.json({ status: response.status });
  }

  const json = await response.json();

  return NextResponse.json(json);
}
