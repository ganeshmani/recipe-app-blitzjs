import db, {FindOneRecipeArgs} from 'db'

export default async function getRecipe(args: FindOneRecipeArgs) {
  const recipe = await db.recipe.findOne(args)

  return recipe
}
