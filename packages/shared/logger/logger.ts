type LocaleDateString = ReturnType<Date["toLocaleString"]>;

type ExecutionDetailsSucess<T extends any[], K> = {
  args: T;
  result: K;
  timing: { start: LocaleDateString; end: LocaleDateString; duration: number };
};

type ExecutionDetailsError<T extends any[], K> = {
  args: T;
  timing: { start: LocaleDateString; end: LocaleDateString; duration: number };
  error: Error;
};

export function logger<T extends any[], K>(
  fn: (...args: T) => Promise<K>,
  successLogger: (details: ExecutionDetailsSucess<T, K>) => string,
  errorLogger?: (details: ExecutionDetailsError<T, K>) => string
): (...args: T) => Promise<K>;

export function logger<T extends any[], K>(
  fn: (...args: T) => K,
  successLogger: (details: ExecutionDetailsSucess<T, K>) => string,
  errorLogger?: (details: ExecutionDetailsError<T, K>) => string
): (...args: T) => K;

export function logger<T extends any[], K>(
  fn: (...args: T) => K | Promise<K>,
  successLogger: (details: ExecutionDetailsSucess<T, K>) => string,
  errorLogger?: (details: ExecutionDetailsError<T, K>) => string
) {
  return (...args: T) => {
    const start = Date.now();

    try {
      const result = fn(...args);

      if (!(result instanceof Promise)) {
        const end = Date.now();
        const msg = successLogger({
          args,
          result,
          timing: {
            start: new Date(start).toLocaleString(),
            end: new Date(end).toLocaleString(),
            duration: end - start,
          },
        });
        console.log(msg);
        return result;
      }

      return result
        .then((value) => {
          const end = Date.now();
          const msg = successLogger({
            args,
            result: value,
            timing: {
              start: new Date(start).toLocaleString(),
              end: new Date(end).toLocaleString(),
              duration: end - start,
            },
          });
          console.log(msg);
          return value;
        })
        .catch((error) => {
          const end = Date.now();
          const msg = errorLogger?.({
            args,
            timing: {
              start: new Date(start).toLocaleString(),
              end: new Date(end).toLocaleString(),
              duration: end - start,
            },
            error,
          });
          console.error(msg);
          throw error;
        });
    } catch (err) {
      const end = Date.now();
      const msg = errorLogger?.({
        args,
        error: err as Error,
        timing: {
          start: new Date(start).toLocaleString(),
          end: new Date(end).toLocaleString(),
          duration: end - start,
        },
      });
      if (msg) console.error(msg);
      throw err;
    }
  };
}
