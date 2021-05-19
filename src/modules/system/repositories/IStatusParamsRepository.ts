interface IStatusParamsRepository {
  getParam(name: string): Promise<string>;
  setParam(name: string, value: string): Promise<void>;
}

export { IStatusParamsRepository };
