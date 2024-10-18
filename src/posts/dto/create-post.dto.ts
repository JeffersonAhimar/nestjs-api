import { PartialType } from '@nestjs/swagger';

export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  readonly userId: number;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
