import React from "react"
import { Box, Image, Badge } from "@chakra-ui/core"
const RecipeItem = ({ id, imageUrl, title, description, likes, onLike }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      rounded="lg"
      bg="white"
      marginRight="20px"
      position="relative"
      overflow="hidden"
      boxShadow="0 1px 3px rgba(44, 46, 65, .15)"
      transition="all .3s ease-in-out"
    >
      <Image objectFit="cover" h={"200px"} w={"300px"} src={imageUrl} alt={"recipe"} />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge rounded="full" px="2" variantColor="teal">
            Popular
          </Badge>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {title}
        </Box>

        <Box>{description}</Box>

        <Box d="flex" mt="2" alignItems="center">
          <Box
            as="span"
            ml="2"
            color="gray.600"
            fontSize="sm"
            cursor="pointer"
            onClick={() => onLike(id, likes)}
          >
            <Image src="./like.png" w={"18px"} h={"18px"} />
            {likes}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default RecipeItem
