export type StatsType = {
like: number;
view: number;
match: number;
block: number;
visited: number;
chat: number;
noted: number;
pourcentStats: number;
};

export const StatsInitial: StatsType = {
like: 0,
view: 0,
match: 0,
block: 0,
visited: 0,
chat: 0,
noted: 0,
pourcentStats: 0,
};

export type StatsActionType =
  | {
      type: 'SET_STATS_ON';
      payload: StatsType;
    }
  | {
      type: 'UPDATE_STATS';
      payload: StatsType;
    }
  | {
      type: 'SET_STATS_OFF';
      payload: {};
    };

export const StatsReducer = (
  stats: StatsType,
  action: StatsActionType,
): StatsType => {
  switch (action.type) {
    case 'SET_STATS_ON':
      return action.payload;
    case 'UPDATE_STATS':
      return action.payload;
    case 'SET_STATS_OFF':
      return StatsInitial;
    default:
      return stats;
  }
};
