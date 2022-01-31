import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;
@Schema({versionKey: false})
export class Product {

  @Prop({auto: true})
  id?: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  imageUrl: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);