import { Injectable } from '@nestjs/common';
import { StockRecordEntity } from './stock-record.entity';
import RootService from '../root/root.service';
import { TransferItemInput, TransferType, TransferStoreInput } from 'src/graphql.schema';
import { GraphQLError } from 'graphql';
import { stringList } from 'aws-sdk/clients/datapipeline';

@Injectable()
export class StockRecordService extends RootService<StockRecordEntity>{
  constructor() { super(StockRecordEntity, 'Bản ghi hàng hóa') }

  async update(input: TransferStoreInput, createdBy: string) {
    //* Update Src records (sender)
    if (input.type !== TransferType.IMPORT) {
      for (let item of input.items) {
        const record = await this.findOne({ idStock: item.idStock, idStore: input.idSrc })

        this.save({
          ...record,
          quantity: record.quantity - item.quantity,
          updatedBy: createdBy
        })
      }
    }

    //* Update Des records (receiver)
    if (input.type === TransferType.TRANSFER || input.type === TransferType.IMPORT) {
      for (let item of input.items) {
        const record = await this.findOne({ idStock: item.idStock, idStore: input.idDes })
        if (record)
          this.save({
            ...record,
            quantity: record.quantity + item.quantity,
            updatedBy: createdBy
          })
        else
          this.save({
            ...item,
            idStore: input.idDes,
            createdBy
          })
      }
    }
  }

  async checkAvailable(input: TransferStoreInput) {
    if (input.type !== TransferType.IMPORT) {
      const idStore = input.idSrc

      const idStocks = input.items.map(i => i.idStock)
      const records = await this.find({ idStock: { $in: idStocks }, idStore })

      // If some src stocks not have record 
      const notMatchLength = records.length < input.items.length

      // If some src record dont have enough quantity
      const notMatchQuantity = records.some((r) => r.quantity < input.items.find(i => i.idStock === r.idStock).quantity)
      
      const notAvailable = notMatchLength || notMatchQuantity

      if (notAvailable)
        throw new GraphQLError('Số lượng hàng hóa không đủ để thực hiện yêu cầu')
    }
  }
}
