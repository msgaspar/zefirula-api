import axios from 'axios';

import {
  ICartolaClubData,
  ICartolaProvider,
  ICartolaSearchResult,
} from '../ICartolaProvider';

class CartolaProvider implements ICartolaProvider {
  async getClubData(id: string): Promise<ICartolaClubData> {
    const { data } = await axios.get(`https://api.cartolafc.globo.com/time/id/${id}`);
    return {
      name: data.time.nome,
      cartoleiro: data.time.nome_cartola,
      badgeImgUrl: data.time.url_escudo_svg,
    };
  }

  async searchClubs(query: string): Promise<ICartolaSearchResult[]> {
    const { data } = await axios.get(`https://api.cartolafc.globo.com/times?q=${query}`);
    return data.map(result => ({
      id: result.time_id,
      cartoleiro: result.nome_cartola,
      name: result.nome,
    }));
  }
}

export { CartolaProvider };
