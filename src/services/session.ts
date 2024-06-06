import { environment } from "../environment";

enum keys {
  USER_FILES = "USER_FILES"
}

export default class SessionService {
  private storage: Storage;
  private socket: WebSocket;
  private subscribers: Array<
    { id: string; cb: (message: Array<string>) => Promise<void> }
  >;
  private static self: SessionService;

  constructor() {
    switch (environment.SESSION_STORAGE) {
      case "local":
        this.storage = localStorage;
        break;
      case "session":
      default:
        this.storage = sessionStorage;
        break;
    }

    this.subscribers = [];
    this.socket = new WebSocket(
      `${environment.BACKEND_SERVICE_WS}`
    );
    this.socket.addEventListener("message", this.onMessage);
    this.socket.addEventListener("error", this.onError);
  }

  private async onMessage(ev: MessageEvent<any>) {
    console.log("message");
    await Promise.all(SessionService.self.subscribers.map((subs) => subs.cb(JSON.parse(ev.data))));
  }

  private onError() {
    SessionService.self.socket = new WebSocket(
        `${environment.BACKEND_SERVICE_WS}`
    );
    SessionService.self.socket.addEventListener("message", this.onMessage);
    SessionService.self.socket.addEventListener("error", this.onError);
  }

  static init() {
    if (!SessionService.self) {
      SessionService.self = new SessionService();
    }
  }

  static saveFiles(file: string) {
    const filesRaw = SessionService.self.storage.getItem(keys.USER_FILES);
    let files = [];

    if (filesRaw) {
        try {
            files.push(...JSON.parse(filesRaw));
        } catch(err) {
            void 0
        }
    }
    
    files.push(file)
    files.filter((elem, idx, arr) => arr.indexOf(elem) === idx); /** Unique */

    SessionService.self.storage.setItem(keys.USER_FILES, JSON.stringify(files));
  }

  static removeFiles() {
    SessionService.self.storage.removeItem(keys.USER_FILES);
  }

  static getFiles() {
    return SessionService.self.storage.getItem(keys.USER_FILES);
  }

  static subscribeToSocket(
    id: string,
    cb: (message: Array<string>) => Promise<void>,
  ) {
    SessionService.self.subscribers.push({ id, cb });
  }

  static unSubscribeFromSocket(id: string) {
    SessionService.self.subscribers = SessionService.self.subscribers.filter(
      (subs) => subs.id !== id,
    );
  }
}

