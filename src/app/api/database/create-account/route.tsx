import {execute, select} from "../../../_components/helper/maria-helper";
import {NextResponse} from "next/server";
import {sha512} from "js-sha512";

const SELECT_CREDENTIALS = `SELECT id FROM credentials WHERE email=?;`;
const SELECT_ALLY_CODE = `SELECT id FROM user WHERE ally_code=?;`
const INSERT_CREDENTIALS = `INSERT INTO credentials (email, password) VALUES (?, ?);`;
const INSERT_USER = `INSERT INTO user (credentials_id, ally_code) VALUES (?, ?);`

export async function POST(req, res) {
  const data = await req.json();
  const ally_code = data.ally_code.replaceAll('-', '');
  const email = data.email;
  const password = sha512(data.password + process.env.NEXT_PUBLIC_SALT);

  let result = await execute(SELECT_CREDENTIALS, [ email ]);
  if (result.length > 0) { // email is already registered
    return NextResponse.json({ created: false, email_exists: true });
  }

  result = await execute(SELECT_ALLY_CODE, [ ally_code ]);
  if (result.length > 0) { // ally_code is already registered.
    return NextResponse.json({ created: false, ally_code_exists: true });
  }

  result = await execute(INSERT_CREDENTIALS, [ email, password ]);
  const credentials_id = result?.insertId ?? -1;
  if (credentials_id === -1) {
    throw new Error("Error 'credentials_id'");
  }

  result = await execute(INSERT_USER, [ credentials_id, ally_code ]);
  const user_id = result?.insertId ?? -1;
  if (user_id === -1) {
    throw new Error("Error 'user_id'");
  }

  return NextResponse.json({ created: true, user_id });
}