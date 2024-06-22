export const trimDescription = (description) => {
  if (description) {
    if (description.length > 124) {
      return `${description.slice(0, 124)}...`;
    }
    return description;
  }
  return '';
};
