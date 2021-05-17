interface IStatusParamsRepository {
  getParam(name: string): Promise<string>;
}

export { IStatusParamsRepository };
