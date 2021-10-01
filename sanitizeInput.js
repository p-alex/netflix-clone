export function sanitizeInput(input) {
  if (typeof input === "string") {
    const cleanInput = input.replace(/[\?\&\/\<\>\;\-\s]/g, "");
    return cleanInput;
  } else {
    return "";
  }
}
