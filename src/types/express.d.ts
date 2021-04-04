declare namespace Express {
  interface Request {
    state: import('../infra/app').State;
  }
}
