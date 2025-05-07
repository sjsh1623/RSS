import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('KatchUp APIs')
        .setDescription('KatchUp 백엔드 API 명세서')
        .setVersion('1.0')
        .addBearerAuth() // ✅ Authorization 헤더 입력창 제공
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document); // 👉 http://localhost:3000/api
    await app.listen(3000);
}

bootstrap();