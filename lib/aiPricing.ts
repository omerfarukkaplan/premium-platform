export function calculateDynamicPrice(
  base: number,
  views: number,
  bookings: number
) {
  let multiplier = 1;

  if (views > 500) multiplier += 0.1;
  if (bookings > 20) multiplier += 0.15;

  return Math.round(base * multiplier);
}
