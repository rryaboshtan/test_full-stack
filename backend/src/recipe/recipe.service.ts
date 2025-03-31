import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class RecipeService {
  private BASE_URL: string | undefined;

  constructor(private configService: ConfigService) {
    this.BASE_URL = this.configService.get<string>('BASE_URL');
  }

  async getRecipes(filter?: {
    ingredient?: string;
    country?: string;
    category?: string;
  }) {
    let url = `${this.BASE_URL}/search.php?s=`;

    if (filter?.ingredient)
      url = `${this.BASE_URL}/filter.php?i=${filter.ingredient}`;
    if (filter?.country)
      url = `${this.BASE_URL}/filter.php?a=${filter.country}`;
    if (filter?.category)
      url = `${this.BASE_URL}/filter.php?c=${filter.category}`;

    const response = await axios.get(url);
    return response.data;
  }

  async getRecipeById(id: string) {
    const response = await axios.get(`${this.BASE_URL}/lookup.php?i=${id}`);
    return response.data;
  }
}
