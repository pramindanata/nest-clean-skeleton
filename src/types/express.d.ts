declare namespace Express {
  interface Request {
    state: import('../infra/api/modules/shared').State;
  }
}
