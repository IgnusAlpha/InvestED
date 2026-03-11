export function formatPercentage(score: number, total: number) {
  return `${Math.round((score / total) * 100)}%`;
}

export function getCurrentDateParts() {
  const now = new Date();

  return {
    timestamp: now.toISOString(),
    date: now.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC',
    }),
    weekday: now.toLocaleDateString('en-GB', {
      weekday: 'long',
      timeZone: 'UTC',
    }),
  };
}
