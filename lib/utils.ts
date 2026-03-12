const MALTA_TIME_ZONE = 'Europe/Malta';

export function formatPercentage(score: number, total: number) {
  return `${Math.round((score / total) * 100)}%`;
}

function getMaltaParts(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: MALTA_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);

  const get = (type: string) => parts.find((part) => part.type === type)?.value || '';

  return {
    day: get('day'),
    month: get('month'),
    year: get('year'),
    weekday: get('weekday'),
    hour: Number(get('hour')),
    minute: Number(get('minute')),
  };
}

export function getMaltaSchoolLeaderboardKey(now = new Date()) {
  const malta = getMaltaParts(now);
  const weekdayAllowed = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(malta.weekday);
  const minutes = malta.hour * 60 + malta.minute;
  const resetMinute = 8 * 60 + 20;

  if (weekdayAllowed && minutes >= resetMinute) {
    return `${malta.year}-${malta.month}-${malta.day}`;
  }

  const previous = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const prevMalta = getMaltaParts(previous);
  return `${prevMalta.year}-${prevMalta.month}-${prevMalta.day}`;
}

export function getCurrentDateParts() {
  const now = new Date();
  const malta = getMaltaParts(now);

  return {
    timestamp: now.toISOString(),
    date: `${malta.day}/${malta.month}/${malta.year}`,
    weekday: malta.weekday,
  };
}

export function isWithinSubmissionWindow(now = new Date()) {
  const malta = getMaltaParts(now);
  const weekdayAllowed = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(malta.weekday);
  const minutes = malta.hour * 60 + malta.minute;
  const start = 8 * 60 + 30;
  const end = 8 * 60 + 50;

  return weekdayAllowed && minutes >= start && minutes <= end;
}

export function getSubmissionWindowMessage() {
  return 'Results can only be submitted on weekdays between 08:30 and 08:50 Malta time.';
}
