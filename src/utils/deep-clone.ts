type FormatKey = (key: string) => string;

export interface DeepCloneOptions {
  /** Transform string keys while cloning plain objects. */
  formatKey?: FormatKey;
  /** Also copy non-enumerable string keys. Default: false */
  includeNonEnumerable?: boolean;
  /** Also copy symbol keys. Default: true */
  includeSymbols?: boolean;
}

/** Narrow check for plain objects (i.e., {}-like) */
function isPlainObject(x: unknown): x is Record<string | symbol, unknown> {
  if (Object.prototype.toString.call(x) !== "[object Object]") return false;
  const proto = Object.getPrototypeOf(x);
  return proto === null || proto === Object.prototype;
}

export function deepClone<T>(
  value: T,
  options: DeepCloneOptions = {},
  refs: WeakMap<object, any> = new WeakMap()
): T {
  const { formatKey, includeNonEnumerable = false, includeSymbols = true } = options;

  // Primitives & functions (left as-is)
  if (value === null || typeof value !== "object") {
    return value;
  }

  // Circular reference handling
  const existing = refs.get(value as unknown as object);
  if (existing) return existing;

  // Built-ins first
  if (value instanceof Date) {
    return new Date(value.getTime()) as unknown as T;
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as unknown as T;
  }

  if (value instanceof Map) {
    const out = new Map<any, any>();
    refs.set(value, out);
    value.forEach((v, k) => {
      const clonedK = deepClone(k, options, refs);
      const clonedV = deepClone(v, options, refs);
      out.set(clonedK, clonedV);
    });
    return out as unknown as T;
  }

  if (value instanceof Set) {
    const out = new Set<any>();
    refs.set(value, out);
    value.forEach((v) => out.add(deepClone(v, options, refs)));
    return out as unknown as T;
  }

  if (value instanceof ArrayBuffer) {
    return value.slice(0) as unknown as T;
  }

  // Typed arrays & DataView
  if (ArrayBuffer.isView(value)) {
    // Covers typed arrays and DataView
    if (value instanceof DataView) {
      const cloned = new DataView(value.buffer.slice(0), value.byteOffset, value.byteLength);
      return cloned as unknown as T;
    } else {
      const Ctor = (value as any).constructor as { new (buf: ArrayBufferLike): any };
      const cloned = new Ctor((value as any).buffer.slice(0));
      return cloned as T;
    }
  }

  if (value instanceof URL) {
    return new URL(value.toString()) as unknown as T;
  }

  if (value instanceof Error) {
    const err = new (value as any).constructor(value.message);
    refs.set(value, err);
    // Copy typical fields
    (err as any).name = value.name;
    (err as any).stack = value.stack;
    // Copy custom props (if any)
    const names = Object.getOwnPropertyNames(value);
    for (const n of names) {
      if (n === "name" || n === "message" || n === "stack") continue;
      (err as any)[n] = deepClone((value as any)[n], options, refs);
    }
    return err;
  }

  // Arrays
  if (Array.isArray(value)) {
    const out: any[] = new Array(value.length);
    refs.set(value, out);
    for (let i = 0; i < value.length; i++) {
      out[i] = deepClone(value[i], options, refs);
    }
    return out as unknown as T;
  }

  // Objects (keep prototype for non-plain too, but only transform keys for plain objects)
  const proto = Object.getPrototypeOf(value);
  const target: Record<string | symbol, any> = Object.create(proto);
  refs.set(value, target);

  // Choose property keys
  const stringKeys = includeNonEnumerable
    ? Object.getOwnPropertyNames(value)
    : Object.keys(value as object); // enumerable only

  for (const k of stringKeys) {
    const srcDesc = Object.getOwnPropertyDescriptor(value, k)!;
    // Only apply key formatting to plain objects and string keys
    const outKey = isPlainObject(value) && typeof k === "string" && typeof formatKey === "function"
      ? formatKey(k)
      : k;

    if ("value" in srcDesc) {
      Object.defineProperty(target, outKey, {
        ...srcDesc,
        value: deepClone((value as any)[k], options, refs),
      });
    } else {
      // Accessors: preserve as-is (getter/setter functions are not cloned)
      Object.defineProperty(target, outKey, srcDesc);
    }
  }

  if (includeSymbols) {
    const symKeys = Object.getOwnPropertySymbols(value);
    for (const s of symKeys) {
      const srcDesc = Object.getOwnPropertyDescriptor(value, s)!;
      if ("value" in srcDesc) {
        Object.defineProperty(target, s, {
          ...srcDesc,
          value: deepClone((value as any)[s], options, refs),
        });
      } else {
        Object.defineProperty(target, s, srcDesc);
      }
    }
  }

  return target as T;
}