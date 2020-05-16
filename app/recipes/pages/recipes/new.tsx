import { Head, Link, useRouter } from "blitz"
import { useState } from "react"
import createRecipe from "app/recipes/mutations/recipes/createRecipe"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Box,
  Stack,
  Image,
  Text,
  Spinner,
  Flex,
} from "@chakra-ui/core"
import { Field, Formik, Form } from "formik"
const NewRecipePage = () => {
  const router = useRouter()

  const [state, setState] = useState({
    name: "",
    description: "",
    imageUrl: "",
    uploadingState: "NONE",
  })

  const validationName = (value) => {
    let error
    // if (!value) {
    //   error = "Name is required"
    // }
    return error
  }

  const validateDescription = (value) => {
    let error
    // if (!value) {
    //   error = "Description is required"
    // }

    return error
  }

  const uploadFile = async (e) => {
    console.log("Uploading....")
    setState({ ...state, uploadingState: "UPLOADING" })
    const files = e.target.files
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "qy3oxqkx")

    const res = await fetch("https://api.cloudinary.com/v1_1/ganeshimaginary/image/upload", {
      method: "POST",
      body: data,
    })

    const file = await res.json()

    setState({ ...state, imageUrl: file.secure_url, uploadingState: "UPLOADED" })
  }

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  return (
    <Flex flexDirection="column" bg="background" w="100vw" h="100vh">
      <Box marginLeft="auto" marginRight="30px">
        <p>
          <Link href="/recipes">
            <Button variantColor="blue" variant="outline" cursor="pointer">
              Back
            </Button>
          </Link>
        </p>
      </Box>

      <Box
        rounded="lg"
        maxW="sm"
        margin="auto"
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        height="100%"
      >
        <Formik
          initialValues={{ name: "", description: "", imageUrl: "" }}
          onSubmit={async (values, actions) => {
            await createRecipe({
              data: {
                name: state.name,
                description: state.description,
                imageUrl: state.imageUrl,
                likes: 0,
              },
            })

            router.push("/recipes")
          }}
        >
          {(props) => (
            <Form style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
              <Field name="name" validate={validationName}>
                {({ field, form }) => (
                  <FormControl isInvalid={props.errors.name && props.touched.name}>
                    <FormLabel htmlFor="name">Recipe Name</FormLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Enter Recipe name"
                      value={state.name}
                      onChange={onChange}
                      boxSizing="border-box"
                    />
                    <FormErrorMessage> {props.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="description" validate={validateDescription}>
                {({ field, form }) => (
                  <FormControl isInvalid={props.errors.description && props.touched.description}>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Input
                      {...field}
                      id="description"
                      value={state.description}
                      placeholder="Enter Description"
                      onChange={onChange}
                      boxSizing="border-box"
                    />
                    <FormErrorMessage>{props.errors.description}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <FormControl>
                <FormLabel>Upload Images</FormLabel>
                <Input type="file" name="file" onChange={uploadFile} boxSizing="border-box" />
                <Stack isInline>
                  {state.uploadingState === "NONE" ? (
                    <Text>Waiting to upload</Text>
                  ) : state.uploadingState === "UPLOADING" ? (
                    <Spinner />
                  ) : (
                    <Image size="100px" objectFit="cover" src={state.imageUrl} alt="recipe" />
                  )}
                </Stack>
              </FormControl>

              <Button
                mt={4}
                variantColor={"teal"}
                boxSizing="border-box"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
}

export default NewRecipePage
