import Link from 'next/link';
import styles from './RecipeInfo.module.scss';
import { getRecipeById, getRecipes } from '@/app/api/recipes';
import Image from 'next/image';
import { Recipe } from '@/app/types';

export default async function RecipeInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await getRecipeById(params.id);
  const recipesByCategory: Recipe[] = await getRecipes({
    category: recipe.strCategory,
  });

  return (
    <div className={styles.container}>
      <div>
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className={styles.recipeImage}
          width={370}
          height={370}
        />
        <h1 className={styles.recipeName}>{recipe.strMeal}</h1>
        <p className={styles.recipeDetails}>
          <Link href={`/?country=${recipe.strArea}`}>{recipe.strArea}</Link>
        </p>
        <p>{recipe.strInstructions}</p>

        <div className={styles.ingredients}>
          <h3>Ingredients:</h3>
          <ul>
            {Object.keys(recipe)
              .filter((key) => key.startsWith('strIngredient') && recipe[key])
              .map((key, index) => (
                <li key={index}>
                  <Link href={`/?ingredient=${recipe[key]}`}>
                    {recipe[key]}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className={styles.ingredients}>
        <h3>Recipes of the category:</h3>
        <ul>
          {recipesByCategory.map((item, index) => (
            <li key={index}>
              <Link href={`/?category=${recipe.strCategory}`}>
                {item.strMeal}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
