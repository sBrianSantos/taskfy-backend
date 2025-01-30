import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly saltOrRounds = 10;

  public async generateHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.saltOrRounds);

    return hash;
  }

  public async validatePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  }
}
