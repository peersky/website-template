import { default as defaultTheme } from "@peersky/next-web3-chakra/dist/theme/theme";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  ...defaultTheme,
  logo: "logo.png",
  //Here can override library theme items
});

export default theme;
