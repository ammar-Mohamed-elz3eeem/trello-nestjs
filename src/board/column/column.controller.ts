import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  create(@Param('slug') slug: string, @Body() createColumnDto: CreateColumnDto) {
    return this.columnService.create(slug, createColumnDto);
  }

  @Get()
  get(@Param('slug') slug: string) {
    return this.columnService.get(slug);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnService.update(id, updateColumnDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.columnService.delete(id);
  }
}
