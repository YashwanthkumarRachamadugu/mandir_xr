// Minimal `process` typing to satisfy TypeScript when @types/node isn't installed

declare const process: {
  env: {
    [key: string]: string | undefined;
  };
};
