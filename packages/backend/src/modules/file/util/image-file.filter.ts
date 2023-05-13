import { BusinessException } from "../../common/exception/business.exception";
import { ErrorCode } from "../../common/exception/error-codes";

const imageFileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
): void => {
    if (!file.mimetype.includes("image/")) {
        return callback(new BusinessException(ErrorCode.INVALID_FILE_TYPE), false);
    }
    callback(null, true);
};

export default imageFileFilter;
