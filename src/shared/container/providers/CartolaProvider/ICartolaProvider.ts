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

interface ICartolaProvider {
  getClubData(id: string): Promise<ICartolaClubData>;
  searchClubs(query: string): Promise<ICartolaSearchResult[]>;
}

export { ICartolaProvider, ICartolaClubData, ICartolaSearchResult };
