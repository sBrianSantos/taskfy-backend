import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenBlacklistService {
  private blacklist = new Map<string, number>();

  public add(token: string, expiresIn: number): void {
    const expiryTimestamp = Date.now() + expiresIn * 1000;

    this.blacklist.set(token, expiryTimestamp);
  }

  public isBlacklisted(token: string): boolean {
    const expiry = this.blacklist.get(token);

    if (!expiry) return false;

    if (Date.now() > expiry) {
      this.blacklist.delete(token);
      return false;
    }

    return true;
  }
}
