import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColumnCardService } from './column-card.service';
import { CreateColumnCardDto } from './dto/create-column-card.dto';

@Controller('')
export class ColumnCardController {
  constructor(private readonly columnCardService: ColumnCardService) {}

  @Post()
  create(@Param('slug') slug: string, @Param('cid') cid: string, @Body() createColumnCardDto: CreateColumnCardDto) {
    return this.columnCardService.create(slug, cid, createColumnCardDto);
  }

  @Get()
  findAll(@Param('slug') slug: string) {
    return this.columnCardService.findAll(slug);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Param('cid') cid: string) {
    return this.columnCardService.remove(id, cid);
  }
}
