import { PartialType } from '@nestjs/swagger';

export class CreatePostDto {
  title: string;
  content: string;
  userId: number;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
