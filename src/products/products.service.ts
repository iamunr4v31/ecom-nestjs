import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException(`Could not find product for the id ${id}`);
    }
    return [product, productIndex];
  }

  insertProduct(
    title: string,
    description: string,
    price: number,
    imageUrl?: string,
  ): string {
    const prodId = Math.random().toString();
    const product = new Product(prodId, title, description, price, imageUrl);
    this.products.push(product);
    return prodId;
  }

  getProducts(): Product[] {
    return [...this.products.map((elem) => ({ ...elem }))];
  }

  getProduct(id: string): Product {
    const [product, _] = this.findProduct(id);
    return { ...product };
  }

  updateProduct(id: string, title: string, description: string, price: number) {
    const [product, idx] = this.findProduct(id);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[idx] = updatedProduct;
  }

  deleteProduct(id: string) {
    const [_, idx] = this.findProduct(id);
    this.products.splice(idx, 1);
  }
}
