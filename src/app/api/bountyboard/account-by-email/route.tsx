import {NextResponse} from "next/server";
import {execute, select} from "../../../_components/helper/maria-helper";
import {sha512} from "js-sha512";

const SELECT_CRED_ID = `SELECT id FROM credentials WHERE LOWER(email)=LOWER(?) AND password=?;`;
const SELECT_USER = `SELECT id AS user_id, ally_code FROM user WHERE credentials_id=?`;

export async function POST(req, res) {
  const data = await req.json();
  const email = data.email;
  const password = sha512(data.password + process.env.NEXT_PUBLIC_SALT);

  let result = await execute(SELECT_CRED_ID, [ email, password ]);
  if (result.length <= 0) {
    return NextResponse.json({ exists: false });
  }

  const credentials_id = result[0].id;

  result = await execute(SELECT_USER, [ credentials_id ]);
  if (result.length <= 0) {
    return NextResponse.json({ exists: false });
  }

  return NextResponse.json({ exists: true, data: result[0] });
}