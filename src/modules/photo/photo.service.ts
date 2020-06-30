import { Injectable } from '@nestjs/common';
import AWS = require('aws-sdk')
import { File } from './photo.type';
import { HashService } from '../utils/hash/hash.service';

@Injectable()
export class PhotoService {
  private readonly ID = 'AKIAIZF3V62VH2J4XNGQ';
  private readonly SECRET = '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';
  private readonly BUCKET_NAME = 'rshopstorage';
  private readonly S3: AWS.S3

  constructor(
    private readonly hashService: HashService,
  ){
    this.S3 = new AWS.S3({
      accessKeyId: this.ID,
      secretAccessKey: this.SECRET
    })
  }

  save(file: File): Promise<string>{
    const id = this.hashService.rand(10) 
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.BUCKET_NAME,
      Key: id,
      Body: file.buffer,
    }
    return new Promise((resolve) => {
      this.S3.upload(params, (err, data) => {
        if (err) throw Error('Upload S3 fail!')
        console.log(`File uploaded successfully. ${data.Location}`);
        resolve(id)
      })
    })
  }
}
