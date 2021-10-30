const handleFetch = (url = "", verb = "", body = {}) => {
  if (verb === "GET") {
    const result = fetch(url)
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return result;
  }
  const result = fetch(url, {
    method: verb,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return result;
};

export default handleFetch;
