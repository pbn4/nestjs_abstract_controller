import { AbstractControllerFactory } from './abstract.controller';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateDto {
  @Expose()
  @IsString()
  name: string;
}

export class ResponseDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
}

export class AppController extends AbstractControllerFactory<
  ResponseDto,
  CreateDto
>({ responseDto: ResponseDto, route: '/' }) {}
