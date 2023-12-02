import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: window.localStorage.getItem("chakra-ui-color-mode") || 'light',
  useSystemColorMode: false
};

export const chakraCustomTheme = extendTheme({
  config
});

// export function deleteColorModeInLocalStorage() {
//   window.localStorage.removeItem("chakra-ui-color-mode");
// }

// After 3s reset the localStorage
//setTimeout(deleteColorModeInLocalStorage, 3000);
