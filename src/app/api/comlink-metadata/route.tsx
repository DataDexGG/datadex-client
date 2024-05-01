import {NextResponse} from "next/server";

export async function GET(req, res) {
  const response = await fetch("http://127.0.0.1:3020/metadata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "payload": {},
      "enums": true
    })
  });

  if (!response.ok) {
    NextResponse.json({ status: response.status });
  }

  const json = await response.json();

  return NextResponse.json(json);
}
