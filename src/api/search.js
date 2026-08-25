const PAGE_SIZE = 50;

export function search(index, query, page = 0) {
  const needle = query.toLowerCase();
  const matches = index.filter((row) => row.title.toLowerCase().includes(needle));
  const start = page * PAGE_SIZE;
  return {
    total: matches.length,
    page,
    results: matches.slice(start, start + PAGE_SIZE),
  };
}

export function handleSearchRequest(req, res, index) {
  const { q = '', page = '0' } = req.query ?? {};
  const payload = search(index, q, Number(page));
  res.setHeader('X-RateLimit-Remaining', 100);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}
