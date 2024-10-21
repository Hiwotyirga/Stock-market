import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ActionService } from './action.service';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Patch(':id/like')
  async likeMedia(@Param('id') id: string) {
    return this.actionService.likeMedia(id);
  }

  @Patch(':id/dislike')
  async dislikeMedia(@Param('id') id: string) {
    return this.actionService.dislikeMedia(id);
  }

  @Post(':id/comment')
  async addComment(@Param('id') id: string, @Body('text') text: string) {
    return this.actionService.addComment(id, text);
  }

  @Get(':id/comment')
  async getComments(@Param('id') id: string) {
    return this.actionService.getComments(id);
  }
}
