// utils/objectArrays.ts

/** Returns the index of the first item where item[key] === value, or -1 if not found */
export function indexOfKeyInArray<T extends Record<string, unknown>, K extends keyof T>(
  objectArray: T[],
  key: K,
  value: T[K]
): number {
  for (let i = 0; i < objectArray.length; i++) {
    if (objectArray[i][key] === value) return i;
  }
  return -1;
}

/** Returns a new array excluding items whose _id matches any _id in excludee */
export function excludeSameIDsFromArray<
  T extends { _id: string | number }
>(arrToExclude: T[], excludee: T[]): T[] {
  if (!arrToExclude?.length) return [];
  if (!excludee?.length) return [...arrToExclude];

  const excludeSet = new Set(excludee.map((e) => e._id));
  return arrToExclude.filter((item) => !excludeSet.has(item._id));
}