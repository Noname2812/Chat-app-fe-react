export const ObjectToQuery = (object) => {
  return (
    "?" +
    Object.keys(object)
      .map((key) => `${key}=${object[key]}`)
      .join("&")
  );
};
