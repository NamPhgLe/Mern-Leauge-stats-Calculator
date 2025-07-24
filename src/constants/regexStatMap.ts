export const regexStatMap: Record<string, { regex: RegExp; key: string }> = {
  armor: {
    regex: /(\d+\.?\d*)\s*(Armor)/i,
    key: 'armor',
  },
  attackDamage: {
    regex: /(\d+\.?\d*)\s*(Attack Damage|attackdamage)/i,
    key: 'attackDamage',
  },
  block: {
    regex: /(\d+\.?\d*)\s*Block/i,
    key: 'block',
  },
  critChance: {
    regex: /(\d+\.?\d*)%\s*(Critical Strike Chance|Crit Chance|crit)/i,
    key: 'critChance',
  },
  critDamagePercent: {
    regex: /(\d+\.?\d*)%\s*(Critical Strike Damage|Crit Damage)/i,
    key: 'critDamagePercent',
  },
  expBonus: {
    regex: /(\d+\.?\d*)%?\s*Bonus Experience/i,
    key: 'expBonus',
  },
  energyRegen: {
    regex: /(\d+\.?\d*)\s*Energy Regen( \/5s)?/i,
    key: 'energyRegen',
  },
  health: {
    regex: /(\d+\.?\d*)\s*(Health|hp)/i,
    key: 'health',
  },
  healthRegen: {
    regex: /(\d+\.?\d*)\s*(Health Regen|hpregen)( \/5s)?/i,
    key: 'healthRegen',
  },
  lethality: {
    regex: /(\d+\.?\d*)\s*Lethality/i,
    key: 'lethality',
  },
  abilityPower: {
    key: 'abilityPower',
    regex: /[+]?(\d+\.?\d*)\s*Ability Power/i,
  },
  magicPenetration: {
    regex: /(\d+\.?\d*)\s*Magic Penetration/i,
    key: 'magicPenetration',
  },
  mana: {
    regex: /(\d+\.?\d*)\s*(Mana|mp)/i,
    key: 'mana',
  },
  manaRegen: {
    regex: /(\d+\.?\d*)\s*(Mana Regen|mpregen)( \/5s)?/i,
    key: 'manaRegen',
  },
  moveSpeed: {
    regex: /(\d+\.?\d*)\s*(Movement Speed|Move Speed|movespeed|moveSpeed)/i,
    key: 'moveSpeed',
  },
  physicalDamage: {
    regex: /(\d+\.?\d*)\s*Bonus Physical Damage/i,
    key: 'physicalDamage',
  },
  magicResist: {
    regex: /(\d+\.?\d*)\s*(Magic Resist|spellblock)/i,
    key: 'magicResist',
  },
  spellVamp: {
    regex: /(\d+\.?\d*)%?\s*Spell Vamp/i,
    key: 'spellVamp',
  },
  timeDead: {
    regex: /(\d+\.?\d*)\s*Time Dead/i,
    key: 'timeDead',
  },
  goldPer10: {
    regex: /(\d+\.?\d*)\s*Gold per 10 Seconds/i,
    key: 'goldPer10',
  },

  // PERCENTAGE STATS
  armorPercent: {
    regex: /(\d+\.?\d*)%\s*Armor/i,
    key: 'armorPercent',
  },
  attackDamagePercent: {
    regex: /(\d+\.?\d*)%\s*Attack Damage/i,
    key: 'attackDamagePercent',
  },
  blockPercent: {
    regex: /(\d+\.?\d*)%\s*Block/i,
    key: 'blockPercent',
  },
  critChancePercent: {
    regex: /(\d+\.?\d*)%\s*(Critical Strike Chance|Crit Chance|crit)/i,
    key: 'critChancePercent',
  },
  critDamagePercentAlt: {
    regex: /(\d+\.?\d*)%\s*(Critical Strike Damage|Crit Damage)/i,
    key: 'critDamagePercent',
  },
  expBonusPercent: {
    regex: /(\d+\.?\d*)%\s*Bonus Experience/i,
    key: 'expBonusPercent',
  },
  healthPercent: {
    regex: /(\d+\.?\d*)%\s*Health/i,
    key: 'healthPercent',
  },
  healthRegenPercent: {
    regex: /(\d+\.?\d*)%\s*Health Regen/i,
    key: 'healthRegenPercent',
  },
  lifeStealPercent: {
    regex: /(\d+\.?\d*)%\s*Life Steal/i,
    key: 'lifeStealPercent',
  },
  magicDamagePercent: {
    regex: /(\d+\.?\d*)%\s*Magic Damage/i,
    key: 'magicDamagePercent',
  },
  moveSpeedPercent: {
    regex: /(\d+\.?\d*)%\s*(Movement Speed|Move Speed)/i,
    key: 'moveSpeedPercent',
  },
  physicalDamagePercent: {
    regex: /(\d+\.?\d*)%\s*Physical Damage/i,
    key: 'physicalDamagePercent',
  },
  magicResistPercent: {
    regex: /(\d+\.?\d*)%\s*Magic Resist/i,
    key: 'magicResistPercent',
  },
  spellVampPercent: {
    regex: /(\d+\.?\d*)%\s*Spell Vamp/i,
    key: 'spellVampPercent',
  },

  // FLAT and PER LEVEL STATS (similar pattern)
  armorPenFlat: {
    regex: /(\d+\.?\d*)\s*Armor Penetration/i,
    key: 'armorPenFlat',
  },
  armorPenPerLevel: {
    regex: /(\d+\.?\d*)\s*Armor Penetration per Level/i,
    key: 'armorPenPerLevel',
  },
  critChanceFlat: {
    regex: /(\d+\.?\d*)\s*Critical Chance/i,
    key: 'critChanceFlat',
  },
  critDamageFlat: {
    regex: /(\d+\.?\d*)\s*Critical Damage/i,
    key: 'critDamageFlat',
  },
  energyRegenFlat: {
    regex: /(\d+\.?\d*)\s*Energy Regen/i,
    key: 'energyRegenFlat',
  },
  energyRegenPerLevel: {
    regex: /(\d+\.?\d*)\s*Energy Regen per Level/i,
    key: 'energyRegenPerLevel',
  },
  goldPer10Flat: {
    regex: /(\d+\.?\d*)\s*Gold per 10 Seconds/i,
    key: 'goldPer10Flat',
  },
  healthPerLevelFlat: {
    regex: /(\d+\.?\d*)\s*Health per Level/i,
    key: 'healthPerLevelFlat',
  },
  healthRegenFlat: {
    regex: /(\d+\.?\d*)\s*Health Regen/i,
    key: 'healthRegenFlat',
  },
  healthRegenPerLevel: {
    regex: /(\d+\.?\d*)\s*Health Regen per Level/i,
    key: 'healthRegenPerLevel',
  },
  manaPerLevelFlat: {
    regex: /(\d+\.?\d*)\s*Mana per Level/i,
    key: 'manaPerLevelFlat',
  },
  manaRegenFlat: {
    regex: /(\d+\.?\d*)\s*Mana Regen/i,
    key: 'manaRegenFlat',
  },
  manaRegenPerLevel: {
    regex: /(\d+\.?\d*)\s*Mana Regen per Level/i,
    key: 'manaRegenPerLevel',
  },
  magicPenFlat: {
    regex: /(\d+\.?\d*)\s*Magic Penetration/i,
    key: 'magicPenFlat',
  },
  magicPenPerLevel: {
    regex: /(\d+\.?\d*)\s*Magic Penetration per Level/i,
    key: 'magicPenPerLevel',
  },
  moveSpeedPerLevelFlat: {
    regex: /(\d+\.?\d*)\s*Movement Speed per Level/i,
    key: 'moveSpeedPerLevelFlat',
  },
  physicalDamagePerLevelFlat: {
    regex: /(\d+\.?\d*)\s*Physical Damage per Level/i,
    key: 'physicalDamagePerLevelFlat',
  },
  magicResistPerLevelFlat: {
    regex: /(\d+\.?\d*)\s*Magic Resist per Level/i,
    key: 'magicResistPerLevelFlat',
  },
  timeDeadFlat: {
    regex: /(\d+\.?\d*)\s*Time Dead/i,
    key: 'timeDeadFlat',
  },
  armorPenPercent: {
    regex: /(\d+\.?\d*)%\s*Armor Penetration/i,
    key: 'armorPenPercent',
  },
  armorPenPerLevelPercent: {
    regex: /(\d+\.?\d*)%\s*Armor Penetration per Level/i,
    key: 'armorPenPerLevelPercent',
  },
  attackSpeedPerLevelPercent: {
    regex: /(\d+\.?\d*)%\s*Attack Speed per Level/i,
    key: 'attackSpeedPerLevelPercent',
  },
  abilityHaste: {
    key: 'abilityHaste',
    regex: /[+]?(\d+\.?\d*)\s*Ability Haste/i,
  },
  cooldownReductionPerLevelPercent: {
    regex: /(\d+\.?\d*)%\s*Cooldown Reduction per Level/i,
    key: 'cooldownReductionPerLevelPercent',
  },
  magicPenPercent: {
    regex: /(\d+\.?\d*)%\s*Magic Penetration/i,
    key: 'magicPenPercent',
  },
  magicPenPerLevelPercent: {
    regex: /(\d+\.?\d*)%\s*Magic Penetration per Level/i,
    key: 'magicPenPerLevelPercent',
  },
  moveSpeedPercentFlat: {
    regex: /(\d+\.?\d*)%\s*Movement Speed/i,
    key: 'moveSpeedPercentFlat',
  },
  moveSpeedPerLevelPercent: {
    regex: /(\d+\.?\d*)%\s*Movement Speed per Level/i,
    key: 'moveSpeedPerLevelPercent',
  },
  percentBaseHealthRegen: {
    regex: /(\d+\.?\d*)%\s*Base Health Regen/i,
    key: 'percentBaseHealthRegen',
  },
  baseManaRegen: {
    regex: /(\d+(\.\d+)?)\s*Base Mana Regen/i,
    key: 'baseManaRegen',
  },
  baseManaRegenPercent: {
    key: 'baseManaRegen %',
    regex: /(\d+(\.\d+)?)%\s*Base Mana Regen/i,
  },
  baseManaRegenFlat: {
    key: 'baseManaRegen',
    regex: /(\d+(\.\d+)?)\s*Base Mana Regen/i,
  },
  baseHealth: {
    regex: /(\d+\.?\d*)\s*Base Health/i,
    key: 'baseHealth',
  },
  baseMana: {
    regex: /(\d+\.?\d*)\s*Base Mana/i,
    key: 'baseMana',
  },
  attackSpeed: {
    regex: /(\d+\.?\d*)\s*(Attack Speed|attackspeed)/i,
    key: 'attackSpeed',
  }
};
