export interface RealtimeChannel {
  broadcast(event: string, payload: unknown): void;
}

export function createRealtimeChannel(): RealtimeChannel {
  return {
    broadcast(event: string, payload: unknown) {
      console.log(`[ws] ${event}`, payload);
    },
  };
}