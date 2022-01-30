import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('image') prodImage?: string,
  ): { id: string } {
    const resId = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
      prodImage,
    );
    return { id: resId };
  }

  @Get()
  getAllProducts(): { products: Product[] } {
    return { products: this.productsService.getProducts() };
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string): Product {
    return this.productsService.getProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('price') price: number,
    @Body('description') desc: string,
  ): {status: string} {
    this.productsService.updateProduct(id, title, desc, price);
    return { status: 'Updated successfully' };
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string): {status: string} {
    this.productsService.deleteProduct(id);
    return { status: 'Updated successfully' };
  }
}
