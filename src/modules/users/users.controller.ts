import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get(':id/favorites')
  async getAllFavorite(@Param('id') id: string) {
    return await this.usersService.getAllFavorite(+id);
  }

  @Post(':id/favorites')
  async addFavorite(@Param('id') id: string, @Body() dto: CreateFavoriteDto) {
    return await this.usersService.addFavorite(+id, dto);
  }

  @Patch(':id/favorites')
  async updateFavorite(
    @Param('id') id: string,
    @Body() dto: UpdateFavoriteDto,
  ) {
    return await this.usersService.updateFavorite(+id, dto);
  }

  @Delete(':id/favorites/:timestamps')
  async deleteFavorite(
    @Param('id') id: string,
    @Param('timestamps') timestamps: string,
  ) {
    return await this.usersService.deleteFavorite(+id, +timestamps);
  }
}
