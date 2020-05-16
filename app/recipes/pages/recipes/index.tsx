import { Suspense, Fragment, useState, useEffect } from "react"
import { Head, Link, useQuery } from "blitz"
import { Flex, Button, Box, Spinner } from "@chakra-ui/core"
import getRecipes from "app/recipes/queries/recipes/getRecipes"
import updateRecipe from "app/recipes/mutations/recipes/updateRecipe"
import RecipeItem from "app/components/RecipeItem"
export const RecipesList = () => {
  const [recipesState, setRecipeState] = useState([])
  const [recipes] = useQuery(getRecipes)

  useEffect(() => {
    if (recipes.length > 0) {
      setRecipeState(recipes)
    }
  }, [recipes])

  return (
    <Fragment>
      {recipesState.map((recipe) => (
        <RecipeItem
          id={recipe.id}
          title={recipe.name}
          imageUrl={recipe.imageUrl}
          description={recipe.description}
          likes={recipe.likes}
          onLike={async (id, likes) => {
            const updated = await updateRecipe({
              where: { id },
              data: { likes: likes + 1 },
            })
            console.log("updated", updated)

            const updatedData = recipesState.map((recipe) => {
              if (recipe.id === updated.id) {
                return updated
              } else {
                return recipe
              }
            })

            setRecipeState(updatedData)
          }}
        />
      ))}
    </Fragment>
  )
}

const RecipesPage = () => {
  return (
    <Flex flexDirection="column" bg="background" w="100vw" h="100vh">
      <Box marginLeft="auto" marginRight="30px">
        <p>
          <Link href="/recipes/new">
            <Button variantColor="blue" variant="outline" cursor="pointer">
              Create Recipe
            </Button>
          </Link>
        </p>
      </Box>
      <Flex p={8} flexWrap="wrap">
        <Suspense fallback={<Spinner size="xl" margin="auto" />}>
          <RecipesList />
        </Suspense>
      </Flex>
    </Flex>
  )
}

export default RecipesPage
