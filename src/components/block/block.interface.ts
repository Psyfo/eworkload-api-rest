import { Document } from 'mongoose';

export default interface IBlock extends Document {
  blockId: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BlockModel extends IBlock, Document {}
