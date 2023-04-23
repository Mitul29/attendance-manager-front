export const getProfileImgLetters = (name) => {
  name = name.trim();
  if (!name) return null;

  const arr = name.split(" ");
  const first = arr[0]?.trim()?.charAt(0);
  const last = arr[arr.length - 1]?.trim()?.charAt(0) || "";

  if (!first) return null;

  return `${first}${last}`;
};
