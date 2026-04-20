export class StorageService<T> {
  private storageType: 'localStorage' | 'sessionStorage';
  private key: string;

  constructor(storageType: 'localStorage' | 'sessionStorage', key: string) {
    this.storageType = storageType; // 타입만 저장
    this.key = key;
  }

  private getStorage(): Storage | null {
    if (typeof window === 'undefined') return null;
    return window[this.storageType];
  }

  get(): T | null {
    const storage = this.getStorage();
    if (!storage) return null;
    const serializedValue = storage.getItem(this.key);
    if (serializedValue === null) return null;
    try {
      return JSON.parse(serializedValue) as T;
    } catch {
      return (serializedValue as T) ?? null;
    }
  }

  set(value: T): void {
    const storage = this.getStorage();
    if (!storage) return;
    storage.setItem(this.key, JSON.stringify(value));
  }

  remove(): void {
    const storage = this.getStorage();
    if (!storage) return;
    storage.removeItem(this.key);
  }
}
