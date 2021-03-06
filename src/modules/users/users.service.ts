import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import NodeGeocoder from 'node-geocoder';
import bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { UpdatePassDto } from './dto/update-pass.dto';

@Injectable()
export class UsersService {
  private geocoder: NodeGeocoder.Geocoder;
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    this.geocoder = NodeGeocoder({
      provider: 'google',
      apiKey: this.configService.get<string>('GOOGLE_API_KEY'),
    });
  }

  async create(dto: CreateUserDto) {
    dto.password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(dto);
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const checkExist = await this.findOneById(id);
    if (!checkExist) {
      throw new ConflictException('User does not exist');
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.userRepository.update(id, updateUserDto);
    return await this.findOneById(id);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async updatePassword(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new ConflictException('User does not exist');
    }
    const newPass = await bcrypt.hash(password, 10);
    return await this.userRepository.update(user.id, { password: newPass });
  }

  async updateNewPassword(dto: UpdatePassDto) {
    const user = await this.findOneByEmail(dto.email);
    if (!user) {
      throw new ConflictException('User does not exist');
    }
    if (!user.comparePassword(dto.oldPassword)) {
      throw new ConflictException('Wrong password');
    }
    const newPass = await bcrypt.hash(dto.newPassword, 10);
    await this.userRepository.update(user.id, { password: newPass });
    return await this.findOneByEmail(dto.email);
  }

  // Favorite
  async getAllFavorite(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      select: { favorites: true, id: true, email: true },
    });
  }

  async addFavorite(id: number, dto: CreateFavoriteDto) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new ConflictException('User does not exist');
    }
    if (!dto.address) {
      const latlngArray = await this.geocoder.reverse({
        lat: dto.lat,
        lon: dto.lng,
      });
      const firstLatLng = latlngArray[0];
      dto.address = firstLatLng.formattedAddress;
    }
    user.favorites.push({
      name: dto.name,
      lat: dto.lat,
      lng: dto.lng,
      address: dto.address,
      createAt: Date.now(),
    });
    const saveResult = await this.userRepository.save(user);
    return saveResult;
  }

  async updateFavorite(id: number, dto: UpdateFavoriteDto) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new ConflictException('User does not exist');
    }
    const favorite = user.favorites.find(
      (favorite) => favorite.createAt === dto.createAt,
    );
    if (!favorite) {
      throw new ConflictException('Favorite does not exist');
    }
    if (!dto.address) {
      const latlngArray = await this.geocoder.reverse({
        lat: dto.lat,
        lon: dto.lng,
      });
      const firstLatLng = latlngArray[0];
      dto.address = firstLatLng.formattedAddress;
    }
    favorite.name = dto.name;
    favorite.lat = dto.lat;
    favorite.lng = dto.lng;
    favorite.address = dto.address;

    const index = user.favorites.indexOf(favorite);
    user.favorites[index] = favorite;

    const saveResult = await this.userRepository.save(user);
    return saveResult;
  }

  async deleteFavorite(id: number, createAt: number) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new ConflictException('User does not exist');
    }
    const favorite = user.favorites.find(
      (favorite) => favorite.createAt === createAt,
    );
    if (!favorite) {
      throw new ConflictException('Favorite does not exist');
    }
    user.favorites = user.favorites.filter(
      (favorite) => favorite.createAt !== createAt,
    );
    const saveResult = await this.userRepository.save(user);
    return saveResult;
  }
}
