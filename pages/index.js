import Head from "next/head";
import Bird from "./birds";
import Boxes from "./boxes";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  Grid,
  Avatar,
  Badge,
  Flex,
  Heading,
  GridItem,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
// import RavenVideo from "../components/RavenVideo";
import Raven from "../components/Raven";
import Socials from "../components/Socials";
import SiteConfig from "../site.config";
const AvatarImage =
  "https://yt3.googleusercontent.com/hUgxPsu8coYGBzfesIezITW_uhvZbRfCLEd_OBmJEcIZ3nZdOgbkUUB4Jjbtfc9oaJB43leGzA0=s160-c-k-c0x00ffffff-no-rj";

function Home() {
  return (
    <>
      <style jsx global>{`
        body {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <Head>
        <title>Home | {SiteConfig.author.name}</title>
      </Head>

      <Box
        zIndex="dropdown"
        justifySelf="flex-end"
        pos="absolute"
        top="10px"
        right="10px"
      >
        <ColorModeSwitcher />
      </Box>
      <Box pos="absolute" zIndex="dropdown">
        <Heading
          p="15px 0 0 15px"
          fontSize="1.1em"
          fontWeight="800"
          letterSpacing="2px"
          as="h1"
        >
          {SiteConfig.author.shortName}
        </Heading>
      </Box>
      <Grid
        h={{ sm: "400px", md: "100vh" }}
        templateRows={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap={0}
      >
        <GridItem
          rowSpan={{ sm: "4", md: "4" }}
          colSpan={{ sm: "1", md: "2" }}
          borderRight="1px"
          className="border-color-mode-home-right"
          pos="relative"
        >
          <Flex align="center" height="100vh" justify="center">
            <Boxes />
          </Flex>
        </GridItem>
        <GridItem p="20px" rowSpan={{ sm: "1", md: "3" }}>
          <Flex
            align="flex-start"
            justify="center"
            direction="column"
            height="100%"
            p={{ sm: "0 0 60px", md: "0 0 0 0px" }}
          >
            <Bird position="absolute" with="100%" />
            {/* <Text
              fontSize="5.5em"
              lineHeight="96px"
              fontWeight="700"
              maxW="12xl"
            >
              Kaan
            </Text>
            <Text
              fontSize="5.5em"
              lineHeight="96px"
              fontWeight="700"
              maxW="12xl"
            >
              Eğriboz
            </Text> */}
          </Flex>
        </GridItem>
        <GridItem
          p="60px 20px"
          rowSpan={{ sm: "1", md: "1" }}
          borderTop="1px"
          className="border-color-mode-home-top"
        >
          <Flex pt="10px">
            <Avatar src={AvatarImage} />
            <Box ml="3">
              <Text fontWeight="bold">
                {SiteConfig.author.name}
                <Badge ml="1" colorScheme="green"></Badge>
              </Text>
              <Text fontSize="sm" align="left">
                {SiteConfig.author.title}
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}
export default Home;
