import { IsBoolean, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @Length(3, 20, {
    message: 'Title must be between 3 to 2 characters',
  })
  title: string;

  @Length(3, 100)
  description: string;

  @IsNotEmpty({
    message: 'Price is required',
  })
  @IsNumber()
  price: number;

  @IsBoolean()
  outOfStock: boolean;

  @IsNumber()
  quantity: number;
}
