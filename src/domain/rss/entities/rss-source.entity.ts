export class RssSource {
  constructor(
    public readonly id: number,
    public readonly url: string,
    public readonly sourceTypeName: string,
    public readonly sourceTypeId: number,
    public readonly language: string,
  ) {}
}
