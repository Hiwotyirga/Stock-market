import { IsOptional, IsString } from 'class-validator';

export class UploadMediaDto {
  @IsOptional()
  file?: Express.Multer.File;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
