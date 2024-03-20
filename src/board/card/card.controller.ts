import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CardService } from './card.service';

@Controller('')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getAllBoardCards(@Param('slug') slug: string) {
    return this.cardService.findAllByBoardId(slug);
  }

  @Delete()
  deleteAllBoardCards(@Param('slug') slug: string) {
    return this.cardService.DeleteAllByBoardId(slug);
  }

  @Put(':cartId')
  update(@Param('cartId') id: string, @Param('slug') slug: string, @Body() updateCardDto: any) {
    return this.cardService.update(slug, id, updateCardDto);
  }

  @Delete(':cartId')
  remove(@Param('cartId') id: string) {
    return this.cardService.delete(id);
  }
}
