export const trimText = (description, limit = 124) => {
  if (description) {
    if (description.length > limit) {
      return `${description.slice(0, limit)}...`;
    }
    return description;
  }
  return '';
};
