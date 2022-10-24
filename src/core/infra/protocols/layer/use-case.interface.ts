export interface IUseCase<IDTO, IResult> {
  execute(dto: IDTO): Promise<IResult>;
}
