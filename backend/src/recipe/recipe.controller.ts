import { Controller, Get, Query, Param } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe, RecipesResponse } from './recipe';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getRecipes(
    @Query('ingredient') ingredient?: string,
    @Query('country') country?: string,
    @Query('category') category?: string,
  ): Promise<RecipesResponse> {
    return this.recipeService.getRecipes({ ingredient, country, category });
  }

  @Get(':id')
  async getRecipeById(@Param('id') id: string): Promise<Recipe> {
    return this.recipeService.getRecipeById(id);
  }
}
