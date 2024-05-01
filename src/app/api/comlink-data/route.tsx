import {NextResponse} from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const version = body.version;

  const response = await fetch("http://127.0.0.1:3020/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "payload": {
        "version": `${version}`,
        "includePveUnits": true,
        "requestSegment": 0
      },
      "enums": true,
    })
  });

  const json = await response.json();

  return NextResponse.json(json);
}
