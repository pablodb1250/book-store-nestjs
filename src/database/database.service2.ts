import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

export const databaseProvider = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(configService: ConfigService) {
      return {
        // ssl: true,
        pport: 3306,
        type: 'mysql' as 'mysql',
        host: configService.get('HOST'),
        username: configService.get('USER'),
        password: configService.get('PASSWORD'),
        database: configService.get('NAME'),
        entities: [__dirname + '../**/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
