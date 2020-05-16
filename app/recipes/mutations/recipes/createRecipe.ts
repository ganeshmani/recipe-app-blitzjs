import db, {RecipeCreateArgs} from 'db'

export default async function createRecipe(args: RecipeCreateArgs) {
  const recipe = await db.recipe.create(args)

  return recipe
}
