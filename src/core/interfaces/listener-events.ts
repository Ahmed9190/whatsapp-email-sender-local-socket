interface SocketEventListener {
  name: string;
  callback(...args: any[]): void;
}

export interface ListenerEvents {
  [key: string]: SocketEventListener;
}
