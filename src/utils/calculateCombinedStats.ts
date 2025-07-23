import { parseItemDescription } from './parseItemDescription';
import { calculateLevelStat, calculateAttackSpeed } from './champUtils';

const renameMap: Record<string, string> = {
  hp: 'health',
  mp: 'mana',
  hpregen: 'healthRegen',
  mpregen: 'manaRegen',
  armor: 'armor',
  spellblock: 'magicResist',
  attackdamage: 'attackDamage',
  attackspeed: 'attackSpeed',
  movespeed: 'moveSpeed',
  crit: 'critChance',
  attackRange: 'attackRange',
};

function renameStatKey(key: string): string {
  return renameMap[key] || key;
}

export function calculateCombinedStats(
  championData: any,
  level: number,
  items: { item: any }[] | undefined,
  trinket: { item: any } | null | undefined
): {
  base: Record<string, number>;
  item: Record<string, number>;
  total: Record<string, number>;
} {
  if (!championData) return { base: {}, item: {}, total: {} };

  const s = championData.stats;
  const baseStatsRaw: Record<string, number> = {
    hp: calculateLevelStat(s.hp, s.hpperlevel, level),
    mp: calculateLevelStat(s.mp, s.mpperlevel, level),
    armor: calculateLevelStat(s.armor, s.armorperlevel, level),
    spellblock: calculateLevelStat(s.spellblock, s.spellblockperlevel, level),
    attackdamage: calculateLevelStat(s.attackdamage, s.attackdamageperlevel, level),
    attackspeed: calculateAttackSpeed(s.attackspeed, s.attackspeedperlevel, level),
    movespeed: s.movespeed,
    hpregen: calculateLevelStat(s.hpregen, s.hpregenperlevel, level),
    mpregen: calculateLevelStat(s.mpregen, s.mpregenperlevel, level),
    crit: calculateLevelStat(s.crit, s.critperlevel, level),
    attackRange: s.attackrange,
  };

  const base: Record<string, number> = {};
  for (const [key, value] of Object.entries(baseStatsRaw)) {
    base[renameStatKey(key)] = value;
  }

  const item: Record<string, number> = {};
  if (items) {
    for (const { item: itm } of items) {
      if (!itm.description) continue;
      const stats = parseItemDescription(itm.description);
      for (const [key, value] of Object.entries(stats)) {
        const renamedKey = renameStatKey(key);
        item[renamedKey] = (item[renamedKey] || 0) + value;
      }
    }
  }

  if (trinket?.item?.description) {
    const trinketStats = parseItemDescription(trinket.item.description);
    for (const [key, value] of Object.entries(trinketStats)) {
      const renamedKey = renameStatKey(key);
      item[renamedKey] = (item[renamedKey] || 0) + value;
    }
  }

  const total: Record<string, number> = { ...base };
  for (const [key, value] of Object.entries(item)) {
    total[key] = (total[key] || 0) + value;
  }

  return { base, item, total };
}
