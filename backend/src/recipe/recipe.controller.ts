import { Controller, Get, Query, Param } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getRecipes(
    @Query('ingredient') ingredient?: string,
    @Query('country') country?: string,
    @Query('category') category?: string,
  ) {
    return this.recipeService.getRecipes({ ingredient, country, category });
  }

  @Get(':id')
  async getRecipeById(@Param('id') id: string) {
    return this.recipeService.getRecipeById(id);
  }
}
