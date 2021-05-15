interface ICartolaClubData {
  name: string;
  cartoleiro: string;
  badgeImgUrl: string;
}

interface ICartolaProvider {
  getClubData(id: string): Promise<ICartolaClubData>;
}

export { ICartolaProvider, ICartolaClubData };
