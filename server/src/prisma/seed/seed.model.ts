import path from "path";
import sharp from "sharp";
import { prisma } from "../db";
import { logInfo } from "../../utils/logger";
import { ModelName } from "../../@types/prisma/seed.types";
import { userPhotosResolutions, usersPhotosDirname } from "../../config/upload.config";

async function seedModel(name: ModelName, dataset: any) {
    await (prisma[name] as any).deleteMany();
    logInfo(`Store ${name} data`);

    if (name === "user") {
        dataset.map((el: any) => {
            const { photos } = el;
            if (photos) {
                photos.forEach(async (photoName: string) => {
                    const localPath = path.join(__dirname, "images", `${photoName}.jpg`);
                    for (const [key, { width, height }] of Object.entries(userPhotosResolutions)) {
                        await sharp(localPath)
                            .resize(width, height)
                            .toFile(path.join(usersPhotosDirname, `${key}.${photoName}.jpg`));
                    }
                });
            }
        });
    }

    await (prisma[name] as any).createMany({
        data: dataset,
    });

    logInfo(`${dataset.length} records have been added`);
}

export default seedModel;