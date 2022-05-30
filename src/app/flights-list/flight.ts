export interface Flight {
  availableSeats: number,
  departuresAt: Date,
  destination: string,
  id: number,
  offset: string,
  sections: [
    {
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
  ],
  vehicleModelName: string
}
