'use client';

import { useCallback, useEffect, useRef } from 'react';
import { safeStorage } from '@/utils/safe-storage';

type DraftMap<T> = Record<string, T>;
type Options<T> = {
  /** debounce ms for writes */
  debounce?: number;
  /** optional sanitizer before persisting */
  serialize?: (value: T) => T;
};

export function useDraftStorage<T>(
  storageKey: string,
  entityId: string | undefined | null,
  value: T | undefined,
  opts: Options<T> = {}
) {
  const { debounce = 300, serialize } = opts;
  const timer = useRef<number | null>(null);

  const getAll = useCallback(() => {
    const obj = safeStorage.get(storageKey);
    return (obj ?? {}) as DraftMap<T>;
  }, [storageKey]);

  const getOne = useCallback(() => {
    if (!entityId) return undefined;
    const all = getAll();
    return all[entityId];
  }, [entityId, getAll]);

  const setOne = useCallback(
    (draft: T | undefined) => {
      console.log('I RUN');
      if (!entityId) return;
      const all = getAll();
      if (draft === undefined) {
        delete all[entityId];
      } else {
        all[entityId] = serialize ? serialize(draft) : draft;
      }
      safeStorage.set(storageKey, all);
    },
    [entityId, getAll, serialize, storageKey]
  );

  const clearOne = useCallback(() => setOne(undefined), [setOne]);

  // Auto-persist on value change (debounced)
  useEffect(() => {
    if (!entityId) return;
    // don’t persist undefined
    if (value === undefined) return;

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setOne(value);
    }, debounce) as unknown as number;

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [entityId, value, debounce, setOne]);

  return {
    /** read the whole drafts map (rarely needed) */
    getAll,
    /** read draft for the current entity id */
    getOne,
    /** write/overwrite draft for current entity id */
    setOne,
    /** remove draft for current entity id */
    clearOne,
  };
}