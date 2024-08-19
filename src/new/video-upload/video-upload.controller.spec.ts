import { Test, TestingModule } from '@nestjs/testing';
import { VideoUploadController } from './video-upload.controller';

describe('VideoUploadController', () => {
  let controller: VideoUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoUploadController],
    }).compile();

    controller = module.get<VideoUploadController>(VideoUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
