const sortBy = (data, param) => [...data].sort((a, b) => b[param] - a[param])

export { sortBy }
