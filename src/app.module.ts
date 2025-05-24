import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? undefined
          : '.env.development.local',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DB_URL'),
        ssl: {
          rejectUnauthorized: false,
        },
        // Uncomment the following lines if you want to use individual DB connection parameters
        // host: configService.get<string>('DB_HOST'),
        // port: configService.get<number>('DB_PORT'),
        // username: configService.get<string>('DB_USERNAME'),
        // password: configService.get<string>('DB_PASSWORD'),
        // database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migration/*{.ts,.js}'],
        migrationsRun: true,
        synchronize: false,
      }),
    }),
    TasksModule,
    UsersModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
