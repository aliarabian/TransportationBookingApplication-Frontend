export interface SeatingSection {
  availableSeats: number,
  id: number,
  privileges: [
    {
      description: string,
      id: number
    }
  ],
  seats: [
    {
      id: number,
      seatNO: string,
      state: string
    }
  ]
  title: string
}
