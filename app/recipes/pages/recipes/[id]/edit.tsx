import {Suspense} from 'react'
import {Head, Link, useRouter, useQuery} from 'blitz'
import getRecipe from 'app/recipes/queries/getRecipe'
import updateRecipe from 'app/recipes/mutations/updateRecipe'

export const EditRecipe = () => {
  const router = useRouter()
  const id = parseInt(router?.query.id as string)
  const [recipe] = useQuery(getRecipe, {where: {id}})

  return (
    <div>
      <h1>Edit Recipe {recipe.id}</h1>
      <pre>
        {JSON.stringify(recipe)}
      </pre>

      <form onSubmit={async (event) => {
        event.preventDefault()
        try {
          const updated = await updateRecipe({
            where: {id: recipe.id},
            data: {name: 'MyNewName'},
          })
          alert('Success!' + JSON.stringify(updated))
          router.push('/recipes/[id]', `/recipes/${updated.id}`)
        } catch (error) {
          alert('Error creating recipe ' + JSON.stringify(error, null, 2))
        }
      }}>
        <div>Put your form fields here. But for now, just click submit</div>
        <button>Submit</button>
      </form>
    </div>
  )
}

const EditRecipePage = () => {
  return (
    <div className="container">
      <Head>
        <title>Edit Recipe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditRecipe />
        </Suspense>

        <p>
          <Link href="/recipes">
            <a>Recipes</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export default EditRecipePage

