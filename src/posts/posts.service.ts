import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async create(data: CreatePostDto) {
    const newPost = this.postRepository.create(data);
    if (data.userId) {
      const user = await this.usersService.findOne(data.userId);
      newPost.user = user;
    }
    return this.postRepository.save(newPost);
  }

  findAll() {
    return this.postRepository.find();
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: number, changes: UpdatePostDto) {
    const post = await this.findOne(id);
    if (changes.userId) {
      const user = await this.usersService.findOne(changes.userId);
      post.user = user;
    }
    this.postRepository.merge(post, changes);
    return this.postRepository.save(post);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    return this.postRepository.remove(post);
  }
}
