import { ClassType } from 'class-transformer/ClassTransformer';
import { plainToClass } from 'class-transformer';
import { Body, Controller, Post } from '@nestjs/common';

export interface AbstractController<TResponseDto, TCreateDto> {
  create(createDto: TCreateDto): Promise<TResponseDto>;
}

export interface AbstractControllerOptions<TResponseDto> {
  route: string,
  responseDto: ClassType<TResponseDto>;
}

export function AbstractControllerFactory<TResponseDto, TCreateDto>(
  options: AbstractControllerOptions<TResponseDto>,
): ClassType<AbstractController<TResponseDto, TCreateDto>> {
  @Controller(options.route)
  class AbstractControllerHost
    implements AbstractController<TResponseDto, TCreateDto> {
    @Post()
    async create(@Body() createDto: TCreateDto): Promise<TResponseDto> {
      return plainToClass(options.responseDto, { id: 'id', name: 'example' });
    }
  }
  return AbstractControllerHost;
}
