/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import SteamUser from "steam-user";
import { EventEmitter } from "events";
import protobuf from "protobufjs";
import path from "path";
import { setTimeout as delay } from "timers/promises";

protobuf.common("descriptor", {});

const root = protobuf.loadSync([
  'base_gcmessages.proto',
  'gcsdk_gcmessages.proto',
  'cstrike15_gcmessages.proto',
].map(name => path.join(__dirname, "..", "Protobufs", "csgo", name)));

const CMsgClientHello = root.lookupType("CMsgClientHello");
const CMsgClientWelcome = root.lookupType("CMsgClientWelcome");
const CSOPersonaDataPublic = root.lookupType("CSOPersonaDataPublic");
const CSOAccountItemPersonalStore = root.lookupType("CSOAccountItemPersonalStore");
const CSOEconGameAccountClient = root.lookupType("CSOEconGameAccountClient");
const CMsgGCCStrike15_v2_MatchmakingGC2ClientHello = root.lookupType("CMsgGCCStrike15_v2_MatchmakingGC2ClientHello");
const CMsgGCCStrike15_v2_ClientGCRankUpdate = root.lookupType("CMsgGCCStrike15_v2_ClientGCRankUpdate");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createGCMessage<T extends protobuf.Type>(type: T, properties?: { [k: string]: any }): Buffer {
  return Buffer.from(type.encode(type.create(properties)).finish());
}

export interface IAccountData {
  personaName: string;
  avatarUrl: string;
  limited: boolean;
  locked: boolean;
  communityBanned: boolean;
  level: number,
  curXp: number;
  prime: boolean;
  bonusXpTimestampRefresh: number | null;
  bonusXpUsedflags: number;
  xpTrailLevel: number;
  xpTrailTimestampRefresh: number | null;
  redeemableDrops: number;
  redeemableDropsGenerated: number | null;
  vac: boolean;
  penaltyReason: string | null;
  penaltyExpires: number | null;
  ranks: {
    premier?: {
      rating: number;
      wins: number;
      leaderboardName: string | null;
      leaderboardNameStatus: number;
    },
    perMapRank: Record<string, {
      rank: number,
      wins: number,
    }>,
    wingman?: {
      rank: number;
      wins: number;
    }
  }
}

const enum SubscribedCacheType {
  CEconItem = 1,
  CEconPersonaDataPublic = 2,
  CEconEquipSlot = 3,
  CEconAccountItemPersonalStore = 4,
  CEconGameAccountClient = 7,
  CEconAccountRecurringSubscription = 39,
  CEconAccountSeasonalOperation = 40,
  CEconAccountSeasonalOperationGS = 41,
  CEconCoupon = 45,
  CEconQuestProgress = 46,
}

interface SubscribedCache {
  typeId: SubscribedCacheType;
  objectData: Buffer[];
}

interface CMsgSOCacheSubscribed {
  objects: Array<{
    typeId: number;
    objectData?: Array<string>;
  }>;
}

const enum RankType {
  Wingman = 7,
  DangerZone = 10,
  Premier = 11,
  PerMap = 12,
}

interface PlayerRankingInfoWingman {
  rankTypeId: RankType.Wingman;
  rankId: number;
  wins: number;
}

// TODO: add dangerzone once implemented

interface PlayerRankingInfoPremier {
  rankTypeId: RankType.Premier;
  rankId: number; // rating
  wins: number;
  rankWindowStats?: string;
  leaderboardName?: string;
  leaderboardNameStatus: number;
}

interface PlayerRankingInfoPerMap {
  rankTypeId: RankType.PerMap,
  perMapRank: Array<{
    mapId: number,
    rankId: number,
    wins: number,
  }>;
}

type PlayerRankingInfo = PlayerRankingInfoWingman | PlayerRankingInfoPremier | PlayerRankingInfoPerMap;

const banReasons = [
  null,
  'Kicked',
  'TK_Limit',
  'TK_Spawn',
  'DisconnectedTooLong',
  'Abandon',
  'TH_Limit',
  'TH_Spawn',
  'OfficialBan',
  'KickedTooMuch',
  'ConvictedForCheating',
  'ConvictedForBehavior',
  'Abandon_Grace',
  'DisconnectedTooLong_Grace',
  'OfficialBan',
  '(empty)',
  'FailedToConnect',
  'KickAbuse',
  'SkillGroupCalibration',
  'GsltViolation',
  'GsltViolation',
  'GriefingReports',
];

function getBanReason(reason: number): string | null {
  return banReasons[reason];
}

// XREF: "file://{images}/map_icons/map_icon_%s.svg" one call above
/* cSpell:disable */
const mapNames = [
  'de_dust',
  'de_dust2',
  'de_train',
  'de_aztec',
  'de_inferno',
  'de_nuke',
  'de_vertigo',
  'cs_office',
  'cs_italy',
  'ar_baggage',
  'ar_baloney',
  'ar_monastery',
  'ar_shoots',
  'de_bank',
  'de_glass',
  'de_lake',
  'de_safehouse',
  'de_shorttrain',
  'de_stmarc',
  'de_sugarcane',
  'cs_assault',
  'cs_militia',
  'de_mirage',
  'de_cache',
  'de_gwalior',
  'de_ali',
  'de_ruins',
  'de_chinatown',
  'de_seaside',
  'cs_siege',
  'cs_agency',
  'de_overpass',
  'de_cbble',
  'cs_motel',
  'cs_downtown',
  'cs_thunder',
  'de_favela',
  'cs_rush',
  'de_mist',
  'de_castle',
  'de_overgrown',
  'cs_insertion',
  'de_blackgold',
  'de_season',
  'de_marquis',
  'de_facade',
  'cs_backalley',
  'cs_workout',
  'de_bazaar',
  'de_shortdust',
  'de_rails',
  'de_resort',
  'de_zoo',
  'de_log',
  'gd_crashsite',
  'gd_lake',
  'gd_bank',
  'gd_cbble',
  'cs_cruise',
  'de_coast',
  'de_empire',
  'de_mikla',
  'de_royal',
  'de_santorini',
  'de_tulip',
  'gd_sugarcane',
  'coop_cementplant',
  'de_canals',
  'gd_rialto',
  'de_austria',
  'de_lite',
  'de_shipped',
  'de_thrill',
  'ar_dizzy',
  'de_shortnuke',
  'de_biome',
  'de_subzero',
  'dz_blacksite',
  'de_abbey',
  'dz_sirocco',
  'de_ruby',
  'de_breach',
  'de_mirage_scrimmagemap',
  'de_cache_scrimmagemap',
  'dz_junglety',
  'ar_lunacy',
  'coop_kasbah',
  'gd_dizzy',
  'gd_lunacy',
  'de_studio',
  'de_anubis',
  'de_chlorine',
  'de_mutiny',
  'de_swamp',
  'lobby_mapveto',
  'dz_frostbite',
  'de_guard',
  'de_elysion',
  'de_engage',
  'cs_apollo',
  'de_ancient',
  'coop_autumn',
  'coop_fall',
  'de_grind',
  'de_mocha',
  'de_calavera',
  'de_pitstop',
  'de_basalt',
  'cs_insertion2',
  'de_ravine',
  'de_extraction',
  'dz_county',
  'de_iris',
  'cs_climb',
  'de_crete',
  'de_hive',
  'dz_vineyard',
  'dz_ember',
  'de_tuscan',
  'de_prime',
  'de_blagai',
  'de_boyard',
  'de_chalice',
  'graphics_settings',
  'warehouse',
];
/* cSpell:enable */

function getMapName(mapId: number) {
  return mapNames[mapId - 1];
}

interface CheckerEvents {
  'log': (message: string) => void;
  'debug': (message: string) => void;
}

export declare interface Checker {
  on<U extends keyof CheckerEvents>(event: U, listener: CheckerEvents[U]): this;
  emit<U extends keyof CheckerEvents>(event: U, ...args: Parameters<CheckerEvents[U]>): boolean;
}

export class Checker extends EventEmitter {
  private data: IAccountData;
  private acquiredData = {
    persona: false,
    accountLimitations: false,
    clientWelcome: false,
    matchmakingClientHello: false,
    caches: false,
    wingmanRank: false,
    premierRank: false,
    perMapRank: false,
  };

  constructor() {
    super();
    this.data = {
      personaName: '',
      avatarUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
      limited: false,
      locked: false,
      communityBanned: false,
      level: 0,
      curXp: 0,
      prime: false,
      bonusXpTimestampRefresh: null,
      bonusXpUsedflags: 0,
      xpTrailLevel: 0,
      xpTrailTimestampRefresh: null,
      redeemableDrops: 0,
      redeemableDropsGenerated: null,
      vac: false,
      penaltyReason: null,
      penaltyExpires: null,
      ranks: {
        perMapRank: {}
      }
    };
  }

  log(message: string) {
    this.emit('log', message);
  }

  debug(message: string) {
    this.emit('debug', message);
  }

  processSubscribedCaches(caches: SubscribedCache[]) {
    for (const {typeId, objectData} of caches) {
      switch (typeId) {
        // TODO: loadout
        case SubscribedCacheType.CEconPersonaDataPublic: {
          if (objectData.length != 1) {
            throw new Error('Expected exactly one CEconPersonaDataPublic object');
          }
          const message = CSOPersonaDataPublic.decode(objectData[0]).toJSON();
          this.data.prime ||= message.elevatedState ?? false;
          // this.data.level = message.playerLevel ?? 0;
          this.data.xpTrailLevel = message.xpTrailLevel ?? 0;
          this.data.xpTrailTimestampRefresh = message.xpTrailTimestampRefresh ?? null;
          this.debug('got personaDataPublic: ' + JSON.stringify(message));
          break;
        }
        case SubscribedCacheType.CEconAccountItemPersonalStore: {
          if (objectData.length != 1) {
            throw new Error('Expected exactly one CEconAccountItemPersonalStore object');
          }
          const message = CSOAccountItemPersonalStore.decode(objectData[0]).toJSON();
          this.data.redeemableDrops = message.redeemableBalance ?? 0;
          this.data.redeemableDropsGenerated = message.generationTime ?? null;
          this.debug('got accountItemPersonalStore: ' + JSON.stringify(message));
          break;
        }
        case SubscribedCacheType.CEconGameAccountClient: {
          if (objectData.length != 1) {
            throw new Error('Expected exactly one CEconGameAccountClient object');
          }
          const message = CSOEconGameAccountClient.decode(objectData[0]).toJSON();
          this.data.prime ||= message.elevatedState === 5;
          this.data.bonusXpTimestampRefresh = message.bonusXpTimestampRefresh ?? null;
          this.data.bonusXpUsedflags = message.bonusXpUsedflags ?? 0;
          this.debug('got gameAccountClient: ' + JSON.stringify(message));
          break;
        }
      }
    }
    this.acquiredData.caches = true;
  }

  processRankingInfo(info: PlayerRankingInfo) {
    switch (info.rankTypeId) {
      case RankType.Wingman:
        this.data.ranks.wingman = {
          rank: info.rankId ?? 0,
          wins: info.wins ?? 0,
        };
        this.acquiredData.wingmanRank = true;
        this.log('got wingman rank');
        break;
      case RankType.Premier: {
        this.data.ranks.premier = {
          rating: info.rankId ?? 0,
          wins: info.wins ?? 0,
          leaderboardName: info.leaderboardName ?? null,
          leaderboardNameStatus: info.leaderboardNameStatus ?? 0,
        };
        this.acquiredData.premierRank = true;
        this.log('got premier rank');
        break;
      }
      case RankType.PerMap: {
        for (const {mapId, rankId, wins} of info.perMapRank ?? []) {
          this.data.ranks.perMapRank[getMapName(mapId)] = {
            rank: rankId,
            wins,
          };
        }
        this.acquiredData.perMapRank = true;
        this.log('got perMap rank');
        break;
      }
    }
  }

  checkDone(): boolean {
    return Object.values(this.acquiredData).every((value) => value);
  }

  public run(refreshToken: string) {
    return new Promise<IAccountData>((resolve, reject) => {
      const steamUser = new SteamUser({
        dataDirectory: null,
        autoRelogin: false,
      });

      steamUser.on('error', (error) => {
        steamUser.logOff();
        reject(error);
      });
      steamUser.on('loggedOn', () => {
        this.log('Logged on');
        steamUser.getPersonas([steamUser.steamID!]);
      });
      steamUser.on('user', (sid, user) => {
        if (sid.toString() == steamUser.steamID?.toString()) {
          this.data.personaName = user.player_name;
          this.data.avatarUrl = user.avatar_url_full;
          this.acquiredData.persona = true;
          this.debug('got persona: ' + JSON.stringify(user));
        }
      });
      steamUser.on('licenses', (licenses) => this.log(`Got ${licenses.length} licenses`));
      steamUser.on('accountLimitations', (limited, communityBanned, locked) => {
        this.data.limited = limited;
        this.data.communityBanned = communityBanned;
        this.data.locked = locked;
        this.acquiredData.accountLimitations = true;
        this.log('got accountLimitations, Launching CS2');
        steamUser.gamesPlayed(730);
      });
      steamUser.on('appLaunched', async (appid) => {
        await delay(1000); // FIXME: is there a better way to do this?
        this.log('Launched CS2');

        // k_EMsgGCClientHello
        steamUser.sendToGC(appid, 4006, {}, createGCMessage(CMsgClientHello, {
          version: 2000266,
          clientSessionNeed: 0,
          clientLauncher: 0,
          steamLauncher: 0,
        }));
      });

      steamUser.on('receivedFromGC', (appid, msgType, payload) => {
        this.debug(`Received GC message: ${appid} ${msgType} ${payload.toString('hex')}`);
        let handled = true;
        try {
          switch (msgType) {
            case 4004: { // k_EMsgGCClientWelcome
  
              // k_EMsgGCCStrike15_v2_ClientGCRankUpdate
              steamUser.sendToGC(appid, 9194, {}, createGCMessage(CMsgGCCStrike15_v2_ClientGCRankUpdate, {
                rankings: [
                  {rankTypeId: RankType.PerMap},
                  // {rankTypeId: RankType.DangerZone}, // not implemented
                  {rankTypeId: RankType.Premier},
                  {rankTypeId: RankType.Wingman},
                ]
              }))
  
              // k_EMsgGCCStrike15_v2_MatchmakingClient2GCHello
              steamUser.sendToGC(appid, 9109, {}, Buffer.alloc(0));
  
              const message = CMsgClientWelcome.decode(payload).toJSON();
              const caches = (message.outofdateSubscribedCaches as CMsgSOCacheSubscribed[]).flatMap<SubscribedCache>((cache) => {
                return cache.objects.filter((object) => object.objectData).map((object) => ({
                  typeId: object.typeId,
                  objectData: object.objectData!.map((data) => Buffer.from(data, 'base64')),
                }));
              });
              this.processSubscribedCaches(caches);
              this.acquiredData.clientWelcome = true;
              this.log('got clientWelcome');
              this.debug('got clientWelcome: ' + JSON.stringify(message));
              break;
            }
            case 9110: { // k_EMsgGCCStrike15_v2_MatchmakingGC2ClientHello
              const message = CMsgGCCStrike15_v2_MatchmakingGC2ClientHello.decode(payload).toJSON();
              this.data.vac = message.vacBanned === 1;
              this.data.penaltyReason = getBanReason(message.penaltyReason ?? 0);
              if (message.penaltySeconds > 0) {
                this.data.penaltyExpires = Math.floor(Date.now() / 1000) + message.penaltySeconds;
              } else {
                this.data.penaltyExpires = null;
              }
              this.data.level = message.playerLevel ?? 0;
              this.data.curXp = (message.playerCurXp ?? 327680000) - 327680000;
              this.acquiredData.matchmakingClientHello = true;
              this.log('got matchmakingClientHello');
              this.debug('got matchmakingClientHello: ' + JSON.stringify(message));
              break;
            }
            case 9194: { // k_EMsgGCCStrike15_v2_ClientGCRankUpdate
              const message = CMsgGCCStrike15_v2_ClientGCRankUpdate.decode(payload).toJSON();
              for (const ranking of message.rankings) {
                this.processRankingInfo(ranking);
              }
              break;
            }
            default:
              handled = false;
              break;
          }
  
          if (handled && this.checkDone()) {
            this.log('done, logging off');
            steamUser.logOff();
            resolve(this.data);
          }
        } catch (error) {
          steamUser.logOff();
          reject(error);
        }
      });

      steamUser.logOn({
        refreshToken,
        machineName: 'cs2-checker',
      });
    });
  }

}