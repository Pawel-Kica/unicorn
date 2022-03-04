import path from "path";
import fse from "fs-extra";
import { uploadMainPath } from "../../config/upload.config";
import { logError, logInfo } from "../../utils/logger";
import testGmailInbox from "../../tests/helpers/testInbox";
import { removeUserTable } from "./cleanUpDev";

export async function deleteCurrentImages() {
    const foldersToRefresh = ["usersPhotos"];
    logInfo("Delete currently storing images");

    for (const folder of foldersToRefresh) {
        await fse.remove(path.join(uploadMainPath, folder));
        await fse.mkdir(path.join(uploadMainPath, folder));
        logInfo(`${folder.charAt(0).toLocaleUpperCase() + folder.slice(1)} - folder has been revamped`);
    }
}

async function cleanUpAfterTests() {
    if (process.env.NODE_ENV === "test") {
        await removeUserTable();
        await deleteCurrentImages();
        await testGmailInbox();
    } else {
        logError(`NODE_ENV is not equal "test", NODE_ENV=${process.env.NODE_ENV}`);
    }
}

export default cleanUpAfterTests;

if (require.main === module) {
    (async () => {
        await cleanUpAfterTests();
    })();
}