import axios from 'axios';
import fs from 'fs';

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
    const capitainScore = data.atletas.find(
      player => player.atleta_id === data.capitao_id,
    )?.pontos_num;
    return {
      score: data.pontos ?? 0,
      captainScore: capitainScore ?? 0,
    };
  }

  async getMarketStatus(): Promise<number> {
    const { data } = await axios.get(`https://api.cartolafc.globo.com/mercado/status`);
    return Number(data.status_mercado);
  }

  async saveResponseFiles(): Promise<void> {
    const statusResponse = await axios.get(
      `https://api.cartolafc.globo.com/mercado/status`,
    );
    const clubResponse = await axios.get(
      `https://api.cartolafc.globo.com/time/id/209491`,
    );
    const timestamp = new Date();
    fs.writeFile(
      `./tmp/status/${timestamp.toISOString()}.json`,
      JSON.stringify(statusResponse.data, null, 4),
      'utf8',
      err => {
        if (err) {
          console.log(err);
        }
        console.log('saved');
      },
    );
    fs.writeFile(
      `./tmp/club/${timestamp.toISOString()}.json`,
      JSON.stringify(clubResponse.data, null, 4),
      'utf8',
      err => {
        if (err) {
          console.log(err);
        }
        console.log('saved');
      },
    );
  }
}

export { CartolaProvider };
