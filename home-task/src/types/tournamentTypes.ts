export interface Prize {
  place: number;
  prize: number;
}

export interface Tournament {
  title: string;
  description: string;
  numberOfPlayers: number;
  entryFee: number;
  prizeDistribution: {
    place: number;
    prize: number;
  }[];
}
