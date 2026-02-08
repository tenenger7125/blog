'use client';

import { STORAGE_KEYS } from '@/constants';
import { Theme } from '@/constants/theme';
import { StorageService } from '@/services/storage-service';

export const themeLocalStorage = new StorageService<{ theme: Theme }>('localStorage', STORAGE_KEYS.THEME);
