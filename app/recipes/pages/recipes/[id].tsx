import { Suspense } from "react"
import { Head, Link, useRouter, useQuery } from "blitz"
import getRecipe from "app/recipes/queries/getRecipe"
import deleteRecipe from "app/recipes/mutations/deleteRecipe"

export const Recipe = () => {
  const router = useRouter()
  const id = parseInt(router?.query.id as string)
  const [recipe] = useQuery(getRecipe, { where: { id } })

  return (
    <div>
      <h1>Recipe {recipe.id}</h1>
      <pre>{JSON.stringify(recipe)}</pre>

      <Link href="/recipes/[id]/edit" as={`/recipes/${recipe.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (confirm("This will be deleted")) {
            await deleteRecipe({ where: { id: recipe.id } })
            router.push("/recipes")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowRecipePage = () => {
  return (
    <div className="container">
      <Head>
        <title>Recipe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>
          <Link href="/recipes">
            <a>Recipes</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Recipe />
        </Suspense>
      </main>
    </div>
  )
}

export default ShowRecipePage
