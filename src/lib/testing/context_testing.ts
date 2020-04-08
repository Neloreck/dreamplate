/**
 * Create mocked context nested data/actions object.
 */
export const createMockContextProperty = (dataKey: string) => new Proxy(
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
  });

/**
 * Create mock context object for testing.
 */
export const createMockContext = <T>(): T => new Proxy({}, { get: (target: {}, property: string) => createMockContextProperty(property) }) as T;
