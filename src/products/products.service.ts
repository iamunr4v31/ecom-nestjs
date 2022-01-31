import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './schemas/products.schema';
import { ProductRepository } from './products.repository';
import { ProductUpdate } from './dto/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productRepository: ProductRepository,
  ) {}

  async getProductById(id: string): Promise<Product> {
    return this.productRepository.findOne({ _id: id });
  }

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find({});
  }

  async createProduct(
    title: string,
    price: number,
    desc?: string,
    imUrl?: string,
  ): Promise<Product> {
    return this.productRepository.create({
      title,
      description: desc ? desc : '',
      price,
      imageUrl: imUrl ? imUrl : '',
    });
  }

  async updateProduct(id: string, update: ProductUpdate): Promise<Product> {
    return this.productRepository.findOneAndUpdate({ id }, update);
  }

  async deleteProduct(id: string) {
    return this.productRepository.findOneAndDelete({ _id: id });
  }
}
