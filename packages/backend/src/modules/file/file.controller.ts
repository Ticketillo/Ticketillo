import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiErrorDecorators } from "../common/exception/error-response.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import imageFileFilter from "./util/image-file.filter";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import * as fs from "fs";
import { ConfigService } from "@nestjs/config";

@ApiTags("file")
@Controller("file")
@ApiErrorDecorators()
export class FileController {
    constructor(private readonly configService: ConfigService) {}

    @Post("image")
    @ApiOperation({ description: "Upload an image file" })
    @UseInterceptors(
        FileInterceptor("file", {
            limits: {
                fileSize: 4000000,
            },
            fileFilter: imageFileFilter,
        }),
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
        const fileName = uuidv4() + "." + file.originalname.split(".").pop();
        fs.writeFileSync(path.join(__dirname, "../../../data/", fileName), file.buffer);

        return `${this.configService.get("server.baseUrl")}/file/${fileName}`;
    }
}
