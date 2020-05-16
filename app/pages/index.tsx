import { Link } from "blitz"
import { Box } from "@chakra-ui/core"

const Home = () => (
  <Box className="container" bg="background" style={{ width: "100vw", height: "100vh" }}>
    <Box margin="auto" w="100px" height="100px">
      <Link href="/recipes">
        <h4>Recipes</h4>
      </Link>
    </Box>
  </Box>
)

export default Home
