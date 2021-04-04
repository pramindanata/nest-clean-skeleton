export interface CryptUtilContract {
  hash(text: string): Promise<string>;
  validate(text: string, hash: string): Promise<boolean>;
}
