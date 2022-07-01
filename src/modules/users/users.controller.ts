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
import { UpdatePassDto } from './dto/update-pass.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOneById(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }

  @Patch(':id/password')
  async updatePassword(@Body() dto: UpdatePassDto) {
    return await this.usersService.updateNewPassword(dto);
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
