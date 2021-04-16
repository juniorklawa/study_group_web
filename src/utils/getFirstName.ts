export const getFirstName = (fullName: string) => {
  return fullName.split(" ").slice(0, -1).join(" ");
};
