import { DataSource } from 'typeorm';
import { Trade } from '../Entity/trade.entity';
import { TransactionData } from '../Entity/TransactionData.enety';
import { User } from '../Entity/user.entity';
import { PaymentMethod } from '../Entity/PaymentMethod.entity';
import { Subscribe } from '../Entity/Subscribe.enetity';
import { TopGainer } from '../entity/TopGainer.entity';
import { TopLoser } from '../entity/TopLoser.entity';
import { MostActivelyTraded } from '../entity/MostActivelyTraded.entity';
import { MediaEntity } from '../Entity/Media.entity';
import { Comment } from '../Entity/comment.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'stockmarket',
  entities: [
    User,
    Trade,
    PaymentMethod,
    Subscribe,
    TopGainer,
    TopLoser,
    MostActivelyTraded,
    MediaEntity,
    TransactionData,
    Comment
  ],
  synchronize: false, 
  logging: true,
  migrations: ['dist/migrations/*.js'], 
});
