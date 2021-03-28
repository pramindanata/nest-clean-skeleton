declare namespace Express {
  interface Request {
    state: import('../infra/api/interface').State;
  }
}
