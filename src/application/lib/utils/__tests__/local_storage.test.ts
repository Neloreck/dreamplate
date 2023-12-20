import { TOptional } from "@/lib/types";
import { getFromLocalStorage, removeLocalStorageItem, setLocalStorageItem } from "@/lib/utils";

describe("Local storage utils test.", () => {
  const EXPECTED_KEY: string = "some-value-key-" + Math.random() * 1000;
  const EXPECTED_DATA: string = "some-value-data-" + Math.random() * 1000;

  afterAll(() => {
    removeLocalStorageItem(EXPECTED_KEY);
  });

  it("should correctly clean encoded values.", () => {
    setLocalStorageItem(EXPECTED_KEY, EXPECTED_DATA);
    removeLocalStorageItem(EXPECTED_KEY);

    expect(getFromLocalStorage(EXPECTED_KEY)).toBeNull();
  });

  it("should correctly save encoded values.", () => {
    setLocalStorageItem(EXPECTED_KEY, EXPECTED_DATA);
    expect(getFromLocalStorage(EXPECTED_KEY)).toBe(EXPECTED_DATA);

    removeLocalStorageItem(EXPECTED_KEY);
  });

  it("should correctly encode key.", () => {
    setLocalStorageItem(EXPECTED_KEY, EXPECTED_DATA);

    const receivedFromLocalStorage: TOptional<string> = localStorage.getItem(EXPECTED_KEY);

    expect(receivedFromLocalStorage).not.toBe(EXPECTED_DATA);

    removeLocalStorageItem(EXPECTED_KEY);
  });
});
