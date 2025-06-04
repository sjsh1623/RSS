// src/domain/rss/entities/rss-source.entity.ts

export interface RssSourceProps {
  id:           number;
  url:          string;
  language:     string;
  providerId:   number;
  providerName: string;
  providerType: string;
  createdAt:    Date;
  updatedAt:    Date;
}

export class RssSource {
  constructor(private readonly props: RssSourceProps) {}

  // getters...
  get id()           { return this.props.id; }
  get url()          { return this.props.url; }
  get language()     { return this.props.language; }
  get providerId()   { return this.props.providerId; }
  get providerName() { return this.props.providerName; }
  get providerType() { return this.props.providerType; }
  get createdAt()    { return this.props.createdAt; }
  get updatedAt()    { return this.props.updatedAt; }
}