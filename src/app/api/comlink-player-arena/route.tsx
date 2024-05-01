import {NextResponse} from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const ally_code = body.ally_code;

  const response = await fetch("http://127.0.0.1:3020/playerArena", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "payload": {
        "allyCode": `${ally_code}`,
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
