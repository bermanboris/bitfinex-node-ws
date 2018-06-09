export enum EventType {
  Error = "error",
  Info = "info",
  Ping = "ping",
  Pong = "pong",
  Conf = "conf",
  Subscribe = "subscribe",
  Subscribed = "subscribed"
}

export type ChannelType = "ticker";
export type Heartbeat = [number, "hb"];

interface InitialEvent {
  event: EventType.Info;
  version: number;
  serverId: string;
  platform: {
    status: number;
  };
}

export type Message =
  | InitialEvent
  | Heartbeat
  | Ticker.SubscribeResponse
  | Ticker.Update.FundingPairsResponse
  | Ticker.Update.TradingPairsResponse
  | Ticker.Snapshot.FundingPairsResponse
  | Ticker.Snapshot.TradingPairsResponse;

namespace Ping {
  export interface Request {
    event: EventType.Ping;
    cid: number;
  }

  interface Response {
    event: EventType.Pong;
    ts: number;
    cid: number;
  }
}

export interface SubscribeRequest {
  event: EventType.Subscribe;
  channel: ChannelType;
  symbol: string;
}

export type RequestMessage = SubscribeRequest | Ping.Request;

export type SubscribeResponse = Ticker.SubscribeResponse;

export namespace Ticker {
  export type UpdateOrSnapshotResponse =
    | Ticker.Snapshot.TradingPairsResponse
    | Ticker.Snapshot.FundingPairsResponse
    | Ticker.Update.FundingPairsResponse
    | Ticker.Update.TradingPairsResponse;

  export interface TradingPairs {
    bid: number;
    bidSize: number;
    ask: number;
    askSize: number;
    dailyChange: number;
    dailyChangePerc: number;
    lastPrice: number;
    volume: number;
    high: number;
    low: number;
  }

  export interface FundingPairs {
    frr: number;
    bid: number;
    bidPeriod: number;
    bidSize: number;
    ask: number;
    askPeriod: number;
    askSize: number;
    dailyChange: number;
    dailyChangePerc: number;
    lastPrice: number;
    volume: number;
    high: number;
    low: number;
  }

  export namespace Snapshot {
    type Response<T> = [number, T];

    export type TradingPairsResponse = Response<TradingPairs>;
    export type FundingPairsResponse = Response<FundingPairs>;

    type TradingPairs = [
      /** BID **/
      number,
      /** BID_SIZE **/
      number,
      /** ASK **/
      number,
      /** ASK_SIZE **/
      number,
      /** DAILY_CHANGE **/
      number,
      /** DAILY_CHANGE_PERC **/
      number,
      /** LAST_PRICE **/
      number,
      /** VOLUME **/
      number,
      /** HIGH **/
      number,
      /** LOW **/
      number
    ];

    type FundingPairs = [
      /** FRR **/
      number,
      /** BID **/
      number,
      /** BID_PERIOD **/
      number,
      /** BID_SIZE **/
      number,
      /** ASK **/
      number,
      /** ASK_PERIOD **/
      number,
      /** ASK_SIZE **/
      number,
      /** DAILY_CHANGE **/
      number,
      /** DAILY_CHANGE_PERC **/
      number,
      /** LAST_PRICE **/
      number,
      /** VOLUME **/
      number,
      /** HIGH **/
      number,
      /** LOW **/
      number
    ];
  }

  export namespace Update {
    type Response<T> = [number, T];

    export type TradingPairsResponse = Response<TradingPairs>;
    export type FundingPairsResponse = Response<FundingPairs>;

    type TradingPairs = [
      /** BID **/
      number,
      /** BID_SIZE **/
      number,
      /** ASK **/
      number,
      /** ASK_SIZE **/
      number,
      /** DAILY_CHANGE **/
      number,
      /** DAILY_CHANGE_PERC **/
      number,
      /** LAST_PRICE **/
      number,
      /** VOLUME **/
      number,
      /** HIGH **/
      number,
      /** LOW **/
      number
    ];

    type FundingPairs = [
      /** FRR **/
      number,
      /** BID **/
      number,
      /** BID_PERIOD **/
      number,
      /** BID_SIZE **/
      number,
      /** ASK **/
      number,
      /** ASK_PERIOD **/
      number,
      /** ASK_SIZE **/
      number,
      /** DAILY_CHANGE **/
      number,
      /** DAILY_CHANGE_PERC **/
      number,
      /** LAST_PRICE **/
      number,
      /** VOLUME **/
      number,
      /** HIGH **/
      number,
      /** LOW **/
      number
    ];
  }

  export type SubscriptionFn = (
    message: Ticker.FundingPairs | Ticker.TradingPairs
  ) => any;

  export interface SubscribeResponse {
    event: EventType.Subscribed;
    channel: "ticker";
    chanId: any;
    symbol: string;
    pair: string;
  }
}

export type Listeners = {
  ticker: Ticker.SubscriptionFn[];
};
