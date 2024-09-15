export const trimText = (description, limit = 124) => {
  if (description) {
    if (description.length > limit) {
      return `${description.slice(0, limit)}...`;
    }
    return description;
  }
  return '';
};

export const wrapDescriptionText = (description, chunkSize = 74) => {
  if (description) {
    const chunks = [];
    let idx = 0;

    while (idx < description.length) {
      chunks.push(description.slice(idx, idx + chunkSize));
      idx += chunkSize;
    }
    return chunks.join(' ');
  }
  return description;
};
