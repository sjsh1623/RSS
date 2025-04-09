import {HttpModule} from '@nestjs/axios';
import {EmbeddingService} from "@/embedding/embeddingService";
import {Module} from "@nestjs/common";

@Module({
    imports: [HttpModule],
    providers: [EmbeddingService],
    exports: [EmbeddingService],
})
export class EmbeddingModule {}