import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Watchlist } from 'src/Entity/WatchlistItem.entity';
import { User } from 'src/Entity/user.entity';
import { MediaEntity } from 'src/Entity/Media.entity';

@Injectable()
export class WatchlistService {
  // constructor(
  //   @InjectRepository(Watchlist)
  //   private readonly watchlistRepository: Repository<Watchlist>,
  //   @InjectRepository(MediaEntity)
  //   private readonly mediaRepository: Repository<MediaEntity>
  // ) {}

  // async addToWatchlist(user: User, mediaId: string): Promise<Watchlist> {
  //   const media = await this.mediaRepository.findOne(mediaId);

  //   if (!media) {
  //     throw new NotFoundException('Media not found');
  //   }

  //   const watchlist = this.watchlistRepository.create({
  //     user,
  //     media,
  //   });

  //   return this.watchlistRepository.save(watchlist);
  // }
}
