export type StackData = PlayerData[];

export interface PlayerData {
  overall: Overall;
  totals: Totals;
  rank: number;
  comp_wins: number;
  last: string;
  weapons: Weapons;
  maps: Maps;
  past10: RecentMatch[];
  best: Best;
  matches: Match[];
  userData: UserData;
}

export interface UserData {
  name: string;
  steamID: string;
  photoURL: string;
}

export interface Best {
  rank: number;
  kpd: number;
  rating: number;
  adr: number;
  hs: number;
  clutches_won: number;
}

export interface RecentMatch {
  result: string;
  map: string;
  map_crc: number;
  score: string;
  rank: number;
  rank_up: number;
  adr: number;
  hs: number;
  rating: number;
  kd: number;
  kpd: number;
}

export interface Maps {
  overall: Record<DeMap, MapsOverall>;
}

export type DeMap =
  | "de_inferno"
  | "de_dust2"
  | "de_mirage"
  | "de_train"
  | "de_nuke"
  | "de_ancient"
  | "de_overpass"
  | "de_vertigo";

export interface MapsOverall {
  played: number;
  won: number;
  rounds_for: number;
  rounds_against: number;
  ct_rounds_for: number;
  ct_rounds_against: number;
  t_rounds_for: number;
  t_rounds_against: number;
}

export interface Weapons {
  // todo: Can turn overall into record???
  overall: WeaponsOverall;
}

export interface WeaponsOverall {
  flashbang: Weapon;
  smokegrenade: Weapon;
  knife: Weapon;
  glock: Weapon;
  molotov: Weapon;
  hegrenade: Weapon;
  mac10: Weapon;
  ak47: Weapon;
  inferno: Weapon;
  tec9: Weapon;
  deagle: Weapon;
  incgrenade: Weapon;
  m4a1_silencer: Weapon;
  usp_silencer: Weapon;
  famas: Weapon;
  m4a1: Weapon;
  galilar: Weapon;
  fiveseven: Weapon;
  p250: Weapon;
  mp9: Weapon;
  decoy: Weapon;
  mag7: Weapon;
  nova: Weapon;
}

export interface Weapon {
  kills: number;
  headshot: number;
  shots: number;
  hits: number;
  dmg: number;
  overkill: number;
  hitgroups: any;
}

export interface Totals {
  // todo: Can turn overall into record???
  overall: TotalsOverall;
}

export interface TotalsOverall {
  ct_rounds: number;
  t_rounds: number;
  adr: number;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  rounds: number;
  HS: number;
  K: number;
  D: number;
  A: number;
  dmg: number;
  rating: number;
  FK: number;
  FD: number;
  FK_T_SPR: number;
  FD_T_SPR: number;
  FK_CT_SPR: number;
  FD_CT_SPR: number;
  FK_T: number;
  FD_T: number;
  FD_T_NOKILL: number;
  FK_CT: number;
  FD_CT: number;
  FD_CT_NOKILL: number;
  "1v1": number;
  "1v1_lost": number;
  "1v2": number;
  "1v2_lost": number;
  "1v3": number;
  "1v3_lost": number;
  "1v4": number;
  "1v4_lost": number;
  "1v5": number;
  "1v5_lost": number;
  rank: number;
  last: number;
  delta: any[];
}

export interface Overall {
  wr: number;
  adr: number;
  hs: number;
  kpd: number;
  rating: number;
  "1v1": number;
  "1v2": number;
  "1v3": number;
  "1v4": number;
  "1v5": number;
  "1vX": number;
  delta: Delta;
}

export interface Delta {
  wr: number;
  adr: number;
  hs: number;
  kpd: number;
  rating: number;
  "1v1": number;
  "1v2": number;
  "1v3": number;
  "1v4": number;
  "1v5": number;
  "1vX": number;
}

export interface Match {
  /**
   * Formatted as "Do MMM YY"
   */
  date: string;
  map: DeMap;

  /**
   * [Our score, enemy score]
   */
  score: [number, number];
  kills: number;
  deaths: number;
  assists: number;
  adr: number;
  hs: number;

  /**
   * Kills - deaths, positive = better
   */
  kdDiff: number;
  rating: number;
  id: number;
  "1v1": number;
  "1v2": number;
  "1v3": number;
  "1v4": number;
  "1v5": number;
  "3k": number;
  "4k": number;
  "5k": number;
}
