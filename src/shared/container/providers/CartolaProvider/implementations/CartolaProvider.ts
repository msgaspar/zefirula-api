import axios from 'axios';

import { ICartolaClubData, ICartolaProvider } from '../ICartolaProvider';

class CartolaProvider implements ICartolaProvider {
  async getClubData(id: string): Promise<ICartolaClubData> {
    const { data } = await axios.get(`https://api.cartolafc.globo.com/time/id/${id}`);
    return {
      name: data.time.nome,
      cartoleiro: data.time.nome_cartola,
      badgeImgUrl: data.time.url_escudo_svg,
    };
  }
}

export { CartolaProvider };
