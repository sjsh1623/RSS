import { Module } from '@nestjs/common';
import { RssService } from './rss.service';

@Module({
  providers: [RssService],
  exports: [RssService], // 다른 모듈에서도 사용할 수 있도록
})
export class RssModule {}