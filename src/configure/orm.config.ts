import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Trade } from "../Entity/trade.entity";
import { User } from "../Entity/user.entity";
// import { PriceHistory } from "../entity/PriceHistory.entity";
import { PaymentMethod } from "../Entity/PaymentMethod.entity";
import { TopGainer } from "../entity/TopGainer.entity";
import { TopLoser } from "../entity/TopLoser.entity";
import { MostActivelyTraded } from "../entity/MostActivelyTraded.entity";
import { MediaEntity } from "../Entity/Media.entity";
import { Comment } from "../Entity/comment.entity";
import { Subscribe } from "../Entity/Subscribe.enetity";
import { TransactionData } from "../Entity/TransactionData.enety";

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432, 
    username: 'postgres', 
    password: 'admin',    
    database: 'stockmarket',
    entities: [
        User,
        Trade,
        // PriceHistory,
        PaymentMethod,
        Subscribe,
        TopGainer,
        TopLoser,
        MostActivelyTraded,
        MediaEntity,
        TransactionData,
        Comment
    ],
    synchronize: true,
};
