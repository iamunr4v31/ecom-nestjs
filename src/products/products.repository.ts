// .repository.ts provides a layer of abstraction from database related functions
// and business logic. Even if in the future the database is changed, so long as
// the functions are implemented as required, the service need not be changed

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Product, ProductDocument } from './schemas/products.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async findOne(productFilterQuery: FilterQuery<Product>): Promise<Product> {
    try {
      const product = await this.productModel.findOne(productFilterQuery);
      if (!product) {
        throw new NotFoundException(`Entry not found for requested query`);
      }
      return product;
    } catch (err) {
      throw new NotFoundException(`Entry not found for requested query`);
    }
  }

  async find(productsFilterQuery: FilterQuery<Product>): Promise<Product[]> {
    try {
      const products = await this.productModel.find(productsFilterQuery);
      if (!products) {
        throw new NotFoundException(`Entry not found for requested query`);
      }
      return products;
    } catch (err) {
      throw new NotFoundException(`Entry not found for requested query`);
    }
  }

  async findOneAndUpdate(
    productFilterQuery: FilterQuery<Product>,
    product: Partial<Product>,
  ): Promise<Product> {
    try {
      const updatedProduct = await this.productModel.findOneAndUpdate(
        productFilterQuery,
        product,
        {
          new: true,
        },
      );
      if (!updatedProduct) {
        throw new NotFoundException(`Entry not found for requested query`);
      }
      return updatedProduct;
    } catch (err) {
      throw new NotFoundException(`Entry not found for requested query`);
    }
  }

  async findOneAndDelete(
    productFilterQuery: FilterQuery<Product>,
  ): Promise<Product> {
    try {
      const product = this.productModel.findOneAndDelete(productFilterQuery);
      if (!product) {
        throw new NotFoundException(
          `Entry not found for requested query: ${productFilterQuery}`,
        );
      }
      return product;
    } catch (err) {
      throw new NotFoundException(
        `Entry not found for requested query: ${productFilterQuery}`,
      );
    }
  }

  async deleteMany(productFilterQuery: FilterQuery<Product>) {
    return this.productModel.deleteMany(productFilterQuery);
  }

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }
}
