import React from "react";
import { Button, VStack } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status !== "loading" && status === "authenticated") {
    //we shouldn't be in this page
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>MyExpenses - Login</title>
        <meta
          name="Track all your expenses and incomes"
          content="WebApp to track your expenses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack bgColor={"background"} h="100vh" color="fontColor">
        <VStack mt="30vh" p="10" spacing="10" bgColor={"boxBackground"} borderRadius="lg" boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} userSelect="none">
        <Image alt="App Logo" src="/MyExpenseLogo.svg" width="100px" height="100px" style={{pointerEvents:"none"}}/>

          <VStack>
            <Button
              colorScheme={"purple"}
              boxShadow="rgba(121, 108, 186, 0.35) 0px 5px 15px;"
              borderRadius="lg"
              onClick={() => signIn("github")}
            >
              <FontAwesomeIcon
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "10px",
                }}
                icon={faGithub}
              />
              Login with GitHub
            </Button>
            <Button
              colorScheme={"cyan"}
              boxShadow="rgba(50, 188, 226, 0.35) 0px 5px 15px;"
              borderRadius="lg"
              onClick={() => signIn("google")}
            >
              <FontAwesomeIcon
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "10px",
                }}
                icon={faGoogle}
              />
              Login with Google
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </>
  );
}

