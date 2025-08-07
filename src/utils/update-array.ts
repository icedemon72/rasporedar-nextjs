// Utility to add an item to an array based on a key event
export function addItemToArrayOnKey<T>(
  array: T[],
  value: T,
  key: string | null = 'Enter',
  checkEmpty = true
): { result: T[]; changed: boolean } {
  const isValid = !checkEmpty || (typeof value === 'string' ? value.trim() !== '' : Boolean(value));

  if (key !== 'Enter' && key !== null) return { result: array, changed: false };
  if (!isValid) return { result: array, changed: false };
  if (array.includes(value)) return { result: array, changed: false };

  return {
    result: [...array, value],
    changed: true
  };
}

// Utility to delete an item from an array by index
export const deleteItemFromArray = <T>(array: T[], index: number): T[] => {
  if (index >= 0 && index < array.length) {
    array.splice(index, 1);
  }
  return array;
};
