import { Controller, Get, Param, Post, UseInterceptors, UploadedFile, Res, Delete, Body } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express';
import AWS = require('aws-sdk')
import { HashService } from '../utils/hash/hash.service';
import { PhotoService } from './photo.service';
import { File } from './photo.type';

const DEFAULT_PHOTOS = ['default-avatar','default-brand']

@Controller('api/photo')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService
  ) { }


  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@UploadedFile() file: File) {
    return this.photoService.save(file)
  }

  @Delete()
  deletePhoto(@Body() body){
    if(DEFAULT_PHOTOS.some(p => p === body.id)) return true
    return this.photoService.remove(body.id)
  }
}
