export default class ComlinkPlayerHelper {

  constructor() {}

  getUnitOmicronsAndZetas(unit, skill_data) {
    const data = {
      zetas: 0,
      omicrons: 0,
    }

    for (let j = 0; j < unit.skill.length; j++) {
      const skill = unit.skill[j];
      const level = skill.tier + 1;

      for (let k = 0; k < skill_data.length; k++) {
        if (skill_data[k].id !== skill.id)
          continue;

        for (let l = 0; l < level; l++) {
          const tier = skill_data[k].tier[l];
          if (tier.isOmicronTier) data.omicrons++;
          else if (tier.isZetaTier) data.zetas++;
        }

        break;
      }
    }

    return data;
  }

  getPlayerOmicronsAndZetas(player, skill_data) {
    const data = {
      zetas: 0,
      omicrons: 0,
    }

    for (let i = 0; i < player.rosterUnit.length; i++) {
      const unit = player.rosterUnit[i];

      const unitData = this.getUnitOmicronsAndZetas(unit, skill_data);
      data.zetas += unitData.zetas;
      data.omicrons += unitData.omicrons;
    }

    return data;
  }

  getRelicCount(player, enums) {
    const data = {
      relic_1_5: 0,
      relic_6_7: 0,
      relic_8_9: 0,
    }

    for (let i = 0; i < player.rosterUnit.length; i++) {
      const unit = player.rosterUnit[i];
      const relic = unit.relic;
      if (!relic) continue;

      const level = enums.RelicTier[relic.currentTier];

      const relicLevel = Math.max(0, level - 2);
      if (relicLevel <= 0) continue;

      if (relicLevel <= 5) data.relic_1_5++;
      else if (relicLevel <= 7) data.relic_6_7++;
      else if (relicLevel <= 9) data.relic_8_9++;
    }

    return data;
  }
}