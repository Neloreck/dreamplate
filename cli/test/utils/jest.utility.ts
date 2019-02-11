export const forSeconds = (seconds: number): Promise<void> => new Promise((resolve) => setTimeout(() => resolve(), seconds * 1000));

/*

export const forMethodToBeCalled = (targetClass, targetMethod, timeoutInSeconds = 1) =>
  new Promise((resolve, reject) => {
    const oldFunc = targetClass[targetMethod].bind(targetClass);

    targetClass[targetMethod] = (...args) => {
      oldFunc(...args);
      targetClass[targetMethod] = oldFunc;
      resolve("Successfully called method.");
    };

    setTimeout(() => {
      targetClass[targetMethod] = oldFunc;
      reject(new Error("Failed to await for message handling @limitedTime."));
    }, timeoutInSeconds * 1000);
  });

export const forExpectedConditions = (expectCallback, timeoutInSeconds = 5, checkFrequency = 5) => {
  const timeoutInMillis = timeoutInSeconds * 1000;
  let interval = null;

  const cleanExecute = (resolve) => {
    expectCallback();
    clearInterval(interval);
    interval = null;
    resolve();
  };

  return new Promise((resolve, reject) => {
    interval = setInterval(() => {
      try {
        cleanExecute(resolve);
      } catch (error) {
        // ignore errors there
      }
    }, timeoutInMillis / checkFrequency);

    setTimeout(() => {
      try {
        cleanExecute();
      } catch (error) {
        if (interval !== null) {
          clearInterval(interval);
          interval = null;
          reject(error);
        }
      }
    }, timeoutInMillis);
  });
};

*/
