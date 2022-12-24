export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getLastUrlSegment = (url: string) => {
  const parts = url.split("/");
  var lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash

  return lastSegment;
};

export const padWithZero = (num: number | string, targetLength: number = 3) => {
  return String(num).padStart(targetLength, "0");
};
