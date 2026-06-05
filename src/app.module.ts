import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { HealthModule } from './health/health.module';
import { TodoOrmEntity } from './todos/infrastructure/orm/todo.orm-entity';

@Module({
  imports: [
    // Make ConfigService available everywhere (reads .env file)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeORM async config so we can inject ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_URI', 'mongodb://localhost:27017'),
        database: configService.get<string>('MONGODB_DATABASE', 'tododb'),
        entities: [TodoOrmEntity],
        // Auto-create/update collections – disable in production and use migrations
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    TodosModule,
    HealthModule,
  ],
})
export class AppModule {}
