'use client';

export class StorageService<T> {
  private storage: Storage | null;
  private key: string;

  constructor(storage: 'localStorage' | 'sessionStorage', key: string) {
    if (typeof window !== 'undefined' && window[storage]) {
      this.storage = window[storage];
    } else {
      this.storage = null;
    }
    this.key = key;
  }

  get(): T | null {
    if (!this.storage) return null;

    const serializedValue = this.storage.getItem(this.key);

    if (serializedValue === null) return null;

    try {
      const parsedValue = JSON.parse(serializedValue) as T;

      return parsedValue ?? null;
    } catch {
      return (serializedValue as T) ?? null;
    }
  }

  set(value: T): void {
    if (!this.storage) return;

    const serializedValue = JSON.stringify(value);
    this.storage.setItem(this.key, serializedValue);
  }

  remove(): void {
    if (!this.storage) return;

    this.storage.removeItem(this.key);
  }
}
