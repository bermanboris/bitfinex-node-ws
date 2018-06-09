import WebSocket from "ws";

import {
  EventType,
  Ticker,
  RequestMessage,
  ChannelType,
  Listeners,
  SubscribeRequest,
  Message
} from "./types";

import {
  isUpdateOrSnapshot,
  isHeartbeat,
  isTickerTradingPairs,
  normalizeTickerTradingPairs,
  normalizeTickerFundingPairs
} from "./helpers";

class Bitfinex {
  private _connected: boolean = false;
  private apiUrl = "wss://api.bitfinex.com/ws/2";
  private connection!: WebSocket;

  private listeners: Listeners = {
    ticker: []
  };

  get isConnected() {
    return this._connected;
  }

  public connect() {
    return new Promise((resolve, reject) => {
      console.log("Connecting to Bitfinex via WS...\n");
      this.connection = new WebSocket(this.apiUrl);

      this.connection.on("open", () => {
        this._connected = true;
        console.info("Connected to Bitfinex.");
        resolve();
      });

      this.connection.on("close", code => {
        this._connected = false;
        console.info(`Disconnected from Bitfinex. Code: ${code}`);
        reject(code);
      });

      this.connection.on("error", error => {
        this._connected = false;
        console.error(`> Error has occured. Err: \n${error.message}\n`);
        reject(error);
      });

      this.connection.onmessage = ({ data }) => {
        try {
          const message: Message = JSON.parse(data.toString());
          this.parseIncomingMessage(message);
        } catch (err) {
          console.error(`Cannot parse message. Err: ${err.message}`);
        }
      };
    });
  }

  private parseIncomingMessage(message: Message) {
    if (isHeartbeat(message)) {
      return console.log(`Heartbeat from channel ${message[0]}!`);
    }

    if (isUpdateOrSnapshot(message)) {
      const normalized = this.normalizeResponse(message);
      return this.notifyListeners("ticker", normalized);
    }
  }

  private normalizeResponse(message: Ticker.UpdateOrSnapshotResponse) {
    if (isTickerTradingPairs(message)) {
      return normalizeTickerTradingPairs(message);
    } else {
      return normalizeTickerFundingPairs(message);
    }
  }

  public ticker(symbol: string, callback: Ticker.SubscriptionFn) {
    this.listeners["ticker"].push(callback);

    const request: SubscribeRequest = {
      event: EventType.Subscribe,
      channel: "ticker",
      symbol
    };

    this.sendMessage(request);
  }

  private notifyListeners(
    channelType: ChannelType,
    message: Ticker.FundingPairs | Ticker.TradingPairs
  ) {
    const listeners = this.listeners[channelType];
    listeners.forEach(listener => listener(message));
  }

  private sendMessage(msg: RequestMessage) {
    try {
      const json = JSON.stringify(msg);
      this.connection.send(json);
    } catch (err) {
      console.error(`Cannot send message. Err: ${err.message}`);
    }
  }
}

export default Bitfinex;
