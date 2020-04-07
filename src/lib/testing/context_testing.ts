/**
 * Create mocked context nested data/actions object.
 */
export const createMockContextProperty = (dataKey: string) => new Proxy({}, { get: (target: {}, property: string) => {
  // Create mock prop based on container-object naming.
  if (dataKey.includes("Actions")) {
    return new Function();
  } else if (dataKey.includes("State")) {
    return "test-prop";
  } else {
    throw new Error(`Accessing non-conventional context manager data property (${dataKey} -> ${property}).`);
  }
}});

/**
 * Create mock context object for testing.
 */
export const createMockContext = <T>(): T => new Proxy({}, { get: (target: {}, property: string) => createMockContextProperty(property) }) as T;
