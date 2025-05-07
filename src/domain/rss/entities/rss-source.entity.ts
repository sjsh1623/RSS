export class RssSource {
  constructor(
    public readonly id: number,
    public readonly url: string,
    public readonly source: string,
    public readonly language: string,
  ) {}
}
