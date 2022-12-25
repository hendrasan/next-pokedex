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

export const statLabel = (stat: string) => {
  switch (stat) {
    case "hp":
      return "HP";
    case "attack":
      return "Attack";
    case "defense":
      return "Defense";
    case "special-attack":
      return "Sp. Atk";
    case "special-defense":
      return "Sp. Def";
    case "speed":
      return "Speed";
    default:
      return stat;
  }
};

export const statColor = (stat: string) => {
  switch (stat) {
    case "hp":
      return "#0571A6";
    case "attack":
      return "#E66D00";
    case "defense":
      return "#E6AB09";
    case "special-attack":
      return "#01B956";
    case "special-defense":
      return "#3C48CF";
    case "speed":
      return "#DE2C2C";
    default:
      return "#42494D";
  }
};
