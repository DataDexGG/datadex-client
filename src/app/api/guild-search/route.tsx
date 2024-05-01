import {NextResponse} from "next/server";

const URL = "http://127.0.0.1:3020/getGuilds";

export async function POST(req, res) {
  const data = await req.json();
  const guild = data.guild;

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "payload": {
        "filterType": 4,
        "count": 10,
        "name": `${guild}`,
      },
      "enums": false
    })
  });

  const json = await response.json();

  // Handle the response data
  return NextResponse.json(json);
}
