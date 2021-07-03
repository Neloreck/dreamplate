import { TAnyObject } from "@/lib/types";

/**
 * Create mocked context nested data/actions object.
 */
export function createMockContextProperty<T>(dataKey: string): T {
  return new Proxy(
    {},
    {
      get: () => {
        // Create mock prop based on container-object naming.
        if (dataKey.includes("Actions")) {
          return new Function();
        } else {
          return "test-prop";
        }
      }
    }
  ) as T;
}

/**
 * Create mock context object for testing.
 */
export function createMockContext<T>(): T {
  return new Proxy(
    {},
    { get: (target: TAnyObject, property: string) => createMockContextProperty(property) }
  ) as T;
}
