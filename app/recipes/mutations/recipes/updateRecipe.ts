import db, {RecipeUpdateArgs} from 'db'

export default async function updateRecipe(args: RecipeUpdateArgs) {
  // Don't allow updating ID
  delete args.data.id

  const recipe = await db.recipe.update(args)

  return recipe
}
