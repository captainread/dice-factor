export const formatCat = (str) => {
  const output = str
    .replace(/(^\w{1})|(\-\w{1})/g, (letter) => letter.toUpperCase())
    .replace(/-/g, " ");
  return output;
};
