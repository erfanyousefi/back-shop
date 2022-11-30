import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import * as basicAuth from "express-basic-auth";
import { SwaggerBearer, SwaggerDocument } from "src/common/enums/swagger.enum";

function SwaggerBearerConfig(): SecuritySchemeObject {
    return {
        type: SwaggerBearer.TYPE,
        scheme: SwaggerBearer.SCHEMA,
        bearerFormat: SwaggerBearer.BEARER_FORMAT,
        in: SwaggerBearer.HEADER
    }
}
function getBasicAuthConfig(): basicAuth.BasicAuthMiddlewareOptions {
    return {
        challenge: true,
        users: {
            [process.env.SWAGGER_USERNAME]: process.env.SWAGGER_PASSWORD
        }
    }
}
export function SwaggerInit(app: INestApplication): void {
    app.use("/", basicAuth(getBasicAuthConfig()))
    const config = new DocumentBuilder()
        .setTitle(SwaggerDocument.TITLE)
        .addTag(SwaggerDocument.TAG)
        .setVersion(SwaggerDocument.VERSION)
        .addBearerAuth(SwaggerBearerConfig())
        .setDescription(SwaggerDocument.DESCRIPTION)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(SwaggerDocument.PATH, app, document);
}
