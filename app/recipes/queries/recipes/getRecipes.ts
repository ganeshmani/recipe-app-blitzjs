import db, { FindManyRecipeArgs } from "db"

export default async function getRecipes(args: FindManyRecipeArgs) {
  const recipes = await db.recipe.findMany(args)

  return recipes
}
