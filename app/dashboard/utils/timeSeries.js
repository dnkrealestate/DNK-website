// Buckets a sparse {date, value} series into a dense day/week/month series
// covering the full range. Daily bars for large ranges (6-12 months) would be
// unreadably thin, so ranges over 31 days roll up into weekly or monthly buckets.
export function bucketDailySeries(points, days, valueKey) {
  const map = new Map(points.map((d) => [d.date, d[valueKey]]));
  const today = new Date();
  const daily = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    daily.push({ date: key, [valueKey]: map.get(key) || 0 });
  }

  if (days <= 31) return { series: daily, granularity: "day" };

  const bucketSize = days <= 182 ? 7 : 30;
  const buckets = [];
  for (let i = 0; i < daily.length; i += bucketSize) {
    const chunk = daily.slice(i, i + bucketSize);
    const value = chunk.reduce((sum, d) => sum + d[valueKey], 0);
    buckets.push({
      date: chunk[0].date,
      endDate: chunk[chunk.length - 1].date,
      [valueKey]: value,
    });
  }
  return { series: buckets, granularity: bucketSize === 7 ? "week" : "month" };
}

export function formatBucketLabel(point, granularity) {
  const fmt = (s) => new Date(s).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  if (granularity === "day") return fmt(point.date);
  if (granularity === "week") return `${fmt(point.date)} – ${fmt(point.endDate)}`;
  return new Date(point.date).toLocaleDateString(undefined, { month: "short", year: "numeric" });
}
