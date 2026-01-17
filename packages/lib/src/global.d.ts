declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV?: string;
  }

  interface Process {
    env?: ProcessEnv;
  }
}

declare const process: NodeJS.Process;
