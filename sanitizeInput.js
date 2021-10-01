export function sanitizeInput(input) {
  if (typeof input === "string") {
    let cleanInput = input.replace(/[\?\&\/\<\>\;\-]/g, "");
    return cleanInput;
  } else {
    return "";
  }
}
