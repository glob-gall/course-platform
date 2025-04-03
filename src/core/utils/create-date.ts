interface CreateDateParams {
  year: number;
  day: number;
  month: number;
  hour?: number;
}
export function createDate({ day, month, year, hour }: CreateDateParams) {
  return new Date(year, month, day, hour ?? 0, 0, 0); // Ano mês dia horas minutos segundos
}
