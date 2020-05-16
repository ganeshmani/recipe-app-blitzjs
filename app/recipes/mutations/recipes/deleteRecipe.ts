import db, {RecipeDeleteArgs} from 'db'

export default async function deleteRecipe(args: RecipeDeleteArgs) {
  const recipe = await db.recipe.delete(args)

  return recipe
}
