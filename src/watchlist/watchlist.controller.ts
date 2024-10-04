import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/Entity/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('watchlist')
export class WatchlistController {
  // constructor(private readonly watchlistService: WatchlistService) {}

  // @Post(':mediaId')
  // @UseGuards(AuthGuard)
  // async addToWatchlist(
  //   @Param('mediaId') mediaId: string,
  // ) {
  //   return this.watchlistService.addToWatchlist( mediaId);
  // }
}
