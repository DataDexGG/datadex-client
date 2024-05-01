export function getLeagueFromSkillLevel(level) {
  for (const [_, value] of Object.entries(Leagues)) {
    if (level < value.max_skill_level) {
      return value;
    }
  }
  return Leagues.CARBONITE;
}

const Leagues = {
  CARBONITE: {
    max_skill_level: 2070,
    name: 'Carbonite',
  },
  BRONZIUM: {
    max_skill_level: 2350,
    name: 'Bronzium',
  },
  CHROMIUM: {
    max_skill_level: 2600,
    name: 'Chromium',
  },
  AURODIUM: {
    max_skill_level: 2970,
    name: 'Aurodium',
  },
  KYBER: {
    max_skill_level: 99999,
    name: 'Kyber',
  },
}
