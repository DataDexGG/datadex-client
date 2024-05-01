import {NextResponse} from "next/server";

export async function GET(req, res) {
  const response = await fetch("http://127.0.0.1:3020/enums", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    NextResponse.json({ status: response.status });
  }

  const json = await response.json();

  return NextResponse.json(json);
}
