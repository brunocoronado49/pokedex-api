import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
    }),
    MongooseModule.forRoot('mongodb://brucedev:123456@localhost:27017/'),
    PokemonModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
