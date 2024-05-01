import {NextResponse} from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const search = body.search;

  const response = await fetch("http://127.0.0.1:3020/getGuilds", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "payload": {
        "filterType": 4,
        "count": 10,
        "name": search,
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
