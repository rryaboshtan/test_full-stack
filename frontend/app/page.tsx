'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './RecipeList.module.scss';
import Link from 'next/link';
import { getRecipes } from './api/recipes';
import { Recipe } from './types';
import Image from 'next/image';

export default function RecipeListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [ingredient, setIngredient] = useState(
    searchParams.get('ingredient') || '',
  );
  const [country, setCountry] = useState(searchParams.get('country') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch all recipes on the first render
  useEffect(() => {
    const fetchAllRecipes = async () => {
      const data = await getRecipes();
      setAllRecipes(data);
      setRecipes(data); // Show all recipes by default

      // Extract unique categories, countries, and ingredients from the fetched data
      const uniqueCategories = Array.from(
        new Set(data.map((recipe: Recipe) => recipe.strCategory)),
      );
      const uniqueCountries = Array.from(
        new Set(data.map((recipe: Recipe) => recipe.strArea)),
      );
      const uniqueIngredients = Array.from(
        new Set(
          data
            .flatMap((recipe: Recipe) => [
              recipe.strIngredient1,
              recipe.strIngredient2,
              recipe.strIngredient3,
            ])
            .filter(Boolean),
        ),
      );

      setCategories(uniqueCategories as string[]);
      setCountries(uniqueCountries as string[]);
      setIngredients(uniqueIngredients as string[]);
    };

    fetchAllRecipes();
  }, []);

  // Filter recipes whenever any of the selected filters change
  useEffect(() => {
    let filteredRecipes = allRecipes;

    if (ingredient)
      filteredRecipes = filteredRecipes.filter((recipe: Recipe) =>
        [
          recipe.strIngredient1,
          recipe.strIngredient2,
          recipe.strIngredient3,
        ].includes(ingredient),
      );

    if (country)
      filteredRecipes = filteredRecipes.filter(
        (recipe: Recipe) => recipe.strArea === country,
      );
    if (category)
      filteredRecipes = filteredRecipes.filter(
        (recipe: Recipe) => recipe.strCategory === category,
      );

    setRecipes(filteredRecipes);
  }, [ingredient, country, category, allRecipes]);

  const updateFilter = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.delete('ingredient');
    params.delete('country');
    params.delete('category');

    if (value) {
      params.set(type, value);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {ingredient
          ? `Recipes with ${ingredient}`
          : country
            ? `Recipes from ${country}`
            : category
              ? `Recipes in ${category}`
              : 'All Recipes'}
      </h1>

      <div className={styles.filters}>
        <select
          value={ingredient}
          onChange={(e) => {
            setIngredient(e.target.value);
            setCountry('');
            setCategory('');
            updateFilter('ingredient', e.target.value);
          }}
          className={styles.select}
        >
          <option value="">Filter by Ingredient</option>
          {ingredients.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setIngredient('');
            setCategory('');
            updateFilter('country', e.target.value);
          }}
          className={styles.select}
        >
          <option value="">Filter by Country</option>
          {countries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setIngredient('');
            setCountry('');
            updateFilter('category', e.target.value);
          }}
          className={styles.select}
        >
          <option value="">Filter by Category</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <ul className={styles.recipeList}>
        {recipes.length === 0 ? (
          <li className={styles.noRecipes}>No recipes found</li>
        ) : (
          recipes.map((recipe) => (
            <li key={recipe.idMeal} className={styles.recipeCard}>
              <Link href={`/recipe/${recipe.idMeal}`}>
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className={styles.recipeImage}
                  width={300}
                  height={200}
                />
                <h2 className={styles.recipeName}>{recipe.strMeal}</h2>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
