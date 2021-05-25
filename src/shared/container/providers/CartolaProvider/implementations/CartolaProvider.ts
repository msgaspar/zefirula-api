import axios from 'axios';

import {
  ICartolaClubData,
  ICartolaClubScore,
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

  async getCurrentRound(): Promise<number> {
    const { data } = await axios.get(`https://api.cartolafc.globo.com/mercado/status`);
    return Number(data.rodada_atual);
  }

  async getScore(clubId: string, round: number): Promise<ICartolaClubScore> {
    const { data } = await axios.get(
      `https://api.cartolafc.globo.com/time/id/${clubId}/${round}`,
    );
    return {
      score: data.time.patrocinador1_id ?? 0,
      captainScore: data.time.patrocinador2_id ?? 0,
    };
  }
}

export { CartolaProvider };
