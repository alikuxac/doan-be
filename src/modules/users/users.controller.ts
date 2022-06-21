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
import { DeleteFavoriteDto } from './dto/delete-favorite.dto';

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
  getAllFavorite(@Param('id') id: string) {
    return this.usersService.getAllFavorite(+id);
  }

  @Post(':id/favorites')
  addFavorite(@Param('id') id: string, @Body() dto: CreateFavoriteDto) {
    return this.usersService.addFavorite(+id, dto);
  }

  @Patch(':id/favorites')
  updateFavorite(@Param('id') id: string, @Body() dto: UpdateFavoriteDto) {
    return this.usersService.updateFavorite(+id, dto);
  }

  @Delete(':id/favorites')
  deleteFavorite(@Param('id') id: string, @Body() dto: DeleteFavoriteDto) {
    return this.usersService.deleteFavorite(+id, dto.timestammp);
  }
}
