export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    if (interval <= 0) throw new Error('interval must be > 0');
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val: val,
    });
  }

  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.val;
  }

  #reap(): void {
    const cutoffTime = Date.now() - this.#interval;
    for (const [key, entry] of this.#cache) {
      if (entry.createdAt < cutoffTime) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop(): void {
    if (this.#reapIntervalId) return;

    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop(): void {
    clearInterval(this.#reapIntervalId!);

    this.#reapIntervalId = undefined;
  }
}

export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};
