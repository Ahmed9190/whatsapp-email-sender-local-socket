interface SocketEventListener {
  name: string;
  callback(...args: any[]): Promise<void>;
}

export interface ListenerEvents {
  [key: string]: SocketEventListener;
}
