export interface SeatingSection {
  availableSeats: number,
  id: number,
  privileges: [
    {
      description: string,
      id: number
    }
  ],
  title: string
}
