function formatDate(isoDate) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  }