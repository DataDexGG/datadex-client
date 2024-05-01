import {execute, select} from "../../_components/helper/maria-helper";
import {NextResponse} from "next/server";
import moment from "moment-timezone";

const NY = "America/New_York";
const MILLIS_WEEK = 1_000 * 60 * 60 * 24 * 7;
const MILLIS_DAY = 1_000 * 60 * 60 * 24;
const MILLIS_HOUR = 1_000 * 60 * 60;

const SELECT_GUILD_DATA = `
SELECT GD.data \
FROM guild AS G, guild_data AS GD \
WHERE G.guild_id=? AND G.id=GD.guild_id \
ORDER BY GD.time DESC \
LIMIT 1;`;

const SELECT_LATEST_GUILD_MEMBERS = `
SELECT MD.data AS md_data, MU.data AS mu_data \
FROM member_data AS MD, member_units AS MU \
WHERE MD.ally_code=MU.ally_code AND MD.ally_code IN (?) \
ORDER BY MD.time DESC
LIMIT 1;
`;

// function selectGuildMembers(days, ninePM, nineAM) {
//   return `
// SELECT data, time, TIMESTAMP() AS nine_thirty, TIMESTAMP() AS ten, \
// FROM member_data \
// WHERE ally_code IN (?) \
// AND time >= (nine_thirty - INTERVAL 1 DAY) AND time <= (ten - INTERVAL 1 DAY) \
// AND time >= (nine_thirty - INTERVAL 2 DAY) AND time <= (ten - INTERVAL 2 DAY) \
// AND time >= (nine_thirty - INTERVAL 3 DAY) AND time <= (ten - INTERVAL 3 DAY) \
// AND time >= (nine_thirty - INTERVAL 4 DAY) AND time <= (ten - INTERVAL 4 DAY) \
// AND time >= (nine_thirty - INTERVAL 5 DAY) AND time <= (ten - INTERVAL 5 DAY) \
// AND time >= (nine_thirty - INTERVAL 6 DAY) AND time <= (ten - INTERVAL 6 DAY) \
// AND time >= (nine_thirty - INTERVAL 7 DAY) AND time <= (ten - INTERVAL 7 DAY) \
// ORDER BY time DESC \
// LIMIT 1;
// `;
// }

function selectGuildMembers(start, end) {
  return `
SELECT data, time, TIMESTAMP(${start}) AS nine_thirty, TIMESTAMP(end) AS ten, \ 
FROM member_data \
WHERE ally_code IN (?) AND time >= nine_thirty AND time <= ten \
ORDER BY time DESC \
LIMIT 1;
`;
}

function selectGuildMembers2(days) {
  return `
SELECT data, time \
FROM member_data \
WHERE ally_code IN (?) AND time >= (NOW() - INTERVAL ${days} DAY) \
ORDER BY time DESC \
LIMIT 1;
`;
}

export async function POST(req, res) {
  const data = await req.json();
  const guild_id = data.guild_id;

  let guildSchema;

  let result = await execute(SELECT_GUILD_DATA, [ guild_id ]);
  if (result.length === 1) {
    guildSchema = result[0].data;
  }

  let memberQueryArr = "";

  const members = guildSchema.data.members;
  for (let i = 0; i < members.length; i++) {
    memberQueryArr += members[i].ally_code;
    if (i !== members.length-1) {
      memberQueryArr += ",";
    }
  }

  const now = moment(Date.now()).tz(NY).format('YYYY-MM-DD HH:mm:ss');
  console.log(now);

  const startOfDay = moment().tz(NY).startOf('day').valueOf();
  const startOfWeek = moment().tz(NY).startOf('week').valueOf();
  const startOfGameWeek = startOfWeek + (MILLIS_HOUR * 16) + (MILLIS_HOUR / 2);
  console.log(startOfDay)

  const weeks = [];

  const stats = {
    galactic_power: { current: 0, yesterday: 0, last_week: 0 },
    character_power: { current: 0, yesterday: 0, last_week: 0 },
    ship_power: { current: 0, yesterday: 0, last_week: 0 },
    zetas: { current: 0, yesterday: 0, last_week: 0 },
    omicrons: { current: 0, yesterday: 0, last_week: 0 },
    galactic_legends: { current: 0, yesterday: 0, last_week: 0 },
    ultimate_galactic_legends: { current: 0, yesterday: 0, last_week: 0 },
    skill: { current: 0, yesterday: 0, last_week: 0 },
    r05: { current: 0, yesterday: 0, last_week: 0 },
    r67: { current: 0, yesterday: 0, last_week: 0 },
    r89: { current: 0, yesterday: 0, last_week: 0 },
  };

  result = await execute(SELECT_LATEST_GUILD_MEMBERS, [ memberQueryArr ]);
  calculateLatest(result, stats);

  console.log(stats);

  // return NextResponse.json({ exists, data: json });
}

function calculateLatest(result, stats) {
  for (let i = 0; i < result.length; i++) {
    const time = result[i].time;
    const member = result[i].data;

    stats.galactic_power.current += member.galactic_power ?? 0;
    stats.character_power.current += member.character_galactic_power ?? 0;
    stats.ship_power.current += member.ship_galactic_power ?? 0;
    stats.skill += member?.skill_rating;
    stats.zetas.current += member.zeta_abilities?.length ?? 0;
    stats.omicrons.current += member.omicron_abilities?.length ?? 0;

    const relicLevel = Math.max((member.relic_tier ?? 0) - 2, 0);
    const isGL = member.is_galactic_legend ?? false;
    const isUGL = member.has_ultimate ?? false;

    stats.r05.current += (relicLevel >= 1 && relicLevel <= 5) ? 1 : 0;
    stats.r67.current += (relicLevel >= 6 && relicLevel <= 7) ? 1 : 0;
    stats.r89.current += (relicLevel >= 8 && relicLevel <= 9) ? 1 : 0;
    stats.galactic_legends.current += (isGL) ? 1 : 0;
    stats.ultimate_galactic_legends.current += (isGL && isUGL) ? 1 : 0;
  }
}