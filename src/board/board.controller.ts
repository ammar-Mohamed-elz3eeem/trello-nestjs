import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Cookies } from 'src/cookies.decorator';

@Controller('/')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    try {
      await this.boardService.createBoard(createBoardDto);
      return { status: 'success', data: 'Board Created Successfully' };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Get()
  async findAll(@Cookies('authKey') auth: string) {
    try {
      const boards = await this.boardService.getBoardsByUserId(auth);
      return { status: 'success', data: boards };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    try {
      const board = await this.boardService.getBoardById(slug);
      return { status: 'success', data: board };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    try {
      console.log(slug, updateBoardDto);
      await this.boardService.updateBoard(slug, updateBoardDto);
      return { status: 'success', data: 'Board updated successfully' };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }

  @Delete(':slug')
  async remove(@Param('slug') slug: string) {
    try {
      await this.boardService.deleteBoard(slug);
      return { status: 'success', data: 'Board Deleted successfully' };
    } catch (error) {
      throw new HttpException({ message: (error as Error).message }, 500);
    }
  }
}
