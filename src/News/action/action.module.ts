import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { MediaEntity } from 'src/Entity/Media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/Entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaEntity, Comment])],
  providers: [ActionService],
  controllers: [ActionController],
})
export class ActionModule {}
