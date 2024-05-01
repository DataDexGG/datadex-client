import {NextResponse} from "next/server";
import { promisify } from 'util';
import { pipeline } from 'stream';
import { createGunzip } from 'zlib';

let node_index = 0;
const nodes = [
  '127.0.0.1:3020',
  // '77.68.7.251:3099',
  // '185.132.40.151:3099',
];

function getNode() {
  node_index++;
  if (node_index >= nodes.length)
    node_index = 0;
  return nodes[node_index];
}

const pipelineAsync = promisify(pipeline);

export async function POST(req, res) {
  const body = await req.json();
  const ally_code = body.ally_code;
  const player_id = body.player_id;

  let payload: any = {};
  if (ally_code) payload.allyCode = ally_code;
  if (player_id) payload.playerId = player_id;

  // const response = await fetch(`http://127.0.0.1:3020/player`, {
  const response = await fetch(`http://${getNode()}/player`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "payload": payload,
      "enums": true
    }),
  });

  if (!response.ok) {
    NextResponse.json({ status: response.status });
  }

  let json = await response.json();

  return NextResponse.json(json);
}

//for (let i = 0; i < json.rosterUnit?.length; i++) {
//     const unit = json.rosterUnit[i];
//     delete unit.equippedStatMod;
//     delete unit.equipment;
//   }
