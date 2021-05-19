interface ICartolaClubData {
  name: string;
  cartoleiro: string;
  badgeImgUrl: string;
}

interface ICartolaSearchResult {
  id: string;
  cartoleiro: string;
  name: string;
}

interface ICartolaClubScore {
  score: number;
  captainScore: number;
}

interface ICartolaProvider {
  getClubData(id: string): Promise<ICartolaClubData>;
  searchClubs(query: string): Promise<ICartolaSearchResult[]>;
  getCurrentRound(): Promise<number>;
  getScore(clubId: string, round: number): Promise<ICartolaClubScore>;
}

export { ICartolaProvider, ICartolaClubData, ICartolaSearchResult, ICartolaClubScore };
