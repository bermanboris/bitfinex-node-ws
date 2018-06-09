import {
  Message,
  Heartbeat,
  EventType,
  Ticker,
  SubscribeResponse
} from "../types";

export function isHeartbeat(msg: Message): msg is Heartbeat {
  return Array.isArray(msg) && msg[1] === "hb";
}

export function isUpdateOrSnapshot(
  msg: Message
): msg is Ticker.UpdateOrSnapshotResponse {
  return Array.isArray(msg);
}

export function isTickerTradingPairs(
  message: Ticker.UpdateOrSnapshotResponse
): message is
  | Ticker.Snapshot.TradingPairsResponse
  | Ticker.Update.TradingPairsResponse {
  return message["1"].length === 10;
}

export function isTickerFundingPairs(
  message: Ticker.UpdateOrSnapshotResponse
): message is
  | Ticker.Snapshot.FundingPairsResponse
  | Ticker.Update.FundingPairsResponse {
  return message["1"].length === 13;
}

export function normalizeTickerTradingPairs(
  message:
    | Ticker.Snapshot.TradingPairsResponse
    | Ticker.Update.TradingPairsResponse
): Ticker.FundingPairs | Ticker.TradingPairs {
  const [
    bid,
    bidSize,
    ask,
    askSize,
    dailyChange,
    dailyChangePerc,
    lastPrice,
    volume,
    high,
    low
  ] = message[1];

  return {
    bid,
    bidSize,
    ask,
    askSize,
    dailyChange,
    dailyChangePerc,
    lastPrice,
    volume,
    high,
    low
  };
}

export function normalizeTickerFundingPairs(
  message:
    | Ticker.Snapshot.FundingPairsResponse
    | Ticker.Update.FundingPairsResponse
) {
  const [
    frr,
    bid,
    bidPeriod,
    bidSize,
    ask,
    askPeriod,
    askSize,
    dailyChange,
    dailyChangePerc,
    lastPrice,
    volume,
    high,
    low
  ] = message["1"];

  return {
    frr,
    bid,
    bidPeriod,
    bidSize,
    ask,
    askPeriod,
    askSize,
    dailyChange,
    dailyChangePerc,
    lastPrice,
    volume,
    high,
    low
  };
}
