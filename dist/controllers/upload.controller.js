"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const mkdirp_1 = require("mkdirp");
const academic_administration_activity_model_1 = __importDefault(require("../models/activity/academic-administration-activity.model"));
const research_activity_model_1 = __importDefault(require("../models/activity/research-activity.model"));
const upload_model_1 = __importDefault(require("../models/upload.model"));
const user_controller_1 = __importDefault(require("./user.controller"));
// AWS CONFIG
aws_sdk_1.default.config.update({
    accessKeyId: 'AKIAJS6HEGWGJTMTSNGQ',
    secretAccessKey: '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'
});
//const uploadDir = path.resolve(__dirname, '../uploads');
const uploadProfPicDir = 'uploads/images';
const uploadEvidenceDir = 'uploads/evidence';
// Ensure upload directory exists
mkdirp_1.sync(uploadProfPicDir);
mkdirp_1.sync(uploadEvidenceDir);
class UploadController {
    static uploadAcademicAdministrationEvidenceAWS(file, userId, activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { createReadStream, filename, mimetype } = yield file;
            const stream = createReadStream();
            // Configure S3
            const params = {
                Bucket: 'eworkload',
                Key: `${userId}/evidence/academic-administration/${filename}`,
                Body: stream,
                ACL: 'public-read',
                ContentType: mimetype
            };
            const s3 = yield new aws_sdk_1.default.S3({
                accessKeyId: 'AKIAJS6HEGWGJTMTSNGQ',
                secretAccessKey: '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',
                region: 'eu-west-2'
            });
            // Upload files to the bucket
            return yield s3.upload(params, function (err, data) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        throw err;
                    }
                    console.log(`File uploaded successfully. ${data.Location}`);
                    yield academic_administration_activity_model_1.default.findOneAndUpdate({ activityId: activityId }, { $set: { evidence: data.Location } }, { upsert: true });
                    console.log('Academic Administration evidence updated');
                    return { location: data.Location };
                });
            });
        });
    }
    static uploadResearchEvidenceAWS(file, userId, activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { createReadStream, filename, mimetype } = yield file;
            const stream = createReadStream();
            // Configure S3
            const params = {
                Bucket: 'eworkload',
                Key: `${userId}/evidence/research/${filename}`,
                Body: stream,
                ACL: 'public-read',
                ContentType: mimetype
            };
            const s3 = yield new aws_sdk_1.default.S3({
                accessKeyId: 'AKIAJS6HEGWGJTMTSNGQ',
                secretAccessKey: '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',
                region: 'eu-west-2'
            });
            // Upload files to the bucket
            return new Promise((resolve, reject) => {
                return s3.upload(params, (err, data) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    if (data) {
                        console.log(`File uploaded successfully. ${data.Location}`);
                        // Update evidence url on activity
                        yield research_activity_model_1.default.findOneAndUpdate({ activityId: activityId }, { $set: { evidence: data.Location } }, { upsert: true });
                        console.log('Research evidence updated');
                        return resolve(data.Location);
                    }
                }));
            });
        });
    }
    static uploadProfilePictureAWS(file, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { createReadStream, filename, mimetype } = yield file;
            const stream = yield createReadStream();
            // Configure S3
            const params = {
                Bucket: 'eworkload',
                Key: `${userId}/profile-img/${filename}`,
                Body: stream,
                ACL: 'public-read',
                ContentType: mimetype
            };
            const s3 = yield new aws_sdk_1.default.S3({
                accessKeyId: 'AKIAJS6HEGWGJTMTSNGQ',
                secretAccessKey: '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',
                region: 'eu-west-2'
            });
            // Upload files to the bucket
            return new Promise((resolve, reject) => {
                return s3.upload(params, (err, data) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    if (data) {
                        console.log(`File uploaded successfully. ${data.Location}`);
                        // Update user photourl
                        const update = yield user_controller_1.default.assignProfilePicture(userId, data.Location);
                        console.log('User photoUrl updated: ', update);
                        return resolve(data.Location);
                    }
                }));
            });
        });
    }
    static files() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield upload_model_1.default.find({});
        });
    }
    static storeDB(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, filename, mimetype, path } = file;
            try {
                let file = new upload_model_1.default({ id, filename, mimetype, path });
                return yield file.save();
            }
            catch (err) {
                return err;
            }
        });
    }
    static uploadProfilePicture(file, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { createReadStream, filename, mimetype } = yield file;
            const stream = yield createReadStream();
            const { id, path } = yield this.storeProfPicFS({
                stream,
                filename,
                userId
            });
            const photoUrl = `http://127.0.0.1:5000/${path}`;
            yield user_controller_1.default.assignProfilePicture(userId, photoUrl);
            return yield this.storeDB({ id, filename, mimetype, path });
        });
    }
    static storeProfPicFS({ stream, filename, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = userId;
            // const path = `${uploadDir}/${id}-${filename}`;
            const path = `${uploadProfPicDir}/${id}-${filename}`;
            console.log('ID:', id);
            console.log('Path:', path);
            return new Promise((resolve, reject) => stream
                .on('error', (error) => {
                if (stream.truncated)
                    fs_1.default.unlinkSync(path);
                reject(error);
            })
                .pipe(fs_1.default.createWriteStream(path))
                .on('error', (error) => reject(error))
                .on('finish', () => resolve({ id, path })));
        });
    }
}
exports.default = UploadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy91cGxvYWQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUEwQjtBQUMxQiw0Q0FBb0I7QUFDcEIsbUNBQThCO0FBRTlCLHVJQUF1RztBQUN2Ryx5R0FBMEU7QUFDMUUsMEVBQTRDO0FBQzVDLHdFQUErQztBQUUvQyxhQUFhO0FBQ2IsaUJBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLFdBQVcsRUFBRSxzQkFBc0I7SUFDbkMsZUFBZSxFQUFFLDBDQUEwQztDQUM1RCxDQUFDLENBQUM7QUFFSCwwREFBMEQ7QUFDMUQsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUMxQyxNQUFNLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDO0FBRTdDLGlDQUFpQztBQUNqQyxhQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QixhQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUV4QixNQUFxQixnQkFBZ0I7SUFDNUIsTUFBTSxDQUFPLHVDQUF1QyxDQUN6RCxJQUFTLEVBQ1QsTUFBYyxFQUNkLFVBQWtCOztZQUVsQixNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDO1lBQzVELE1BQU0sTUFBTSxHQUFHLGdCQUFnQixFQUFFLENBQUM7WUFFbEMsZUFBZTtZQUNmLE1BQU0sTUFBTSxHQUFHO2dCQUNiLE1BQU0sRUFBRSxXQUFXO2dCQUNuQixHQUFHLEVBQUUsR0FBRyxNQUFNLHFDQUFxQyxRQUFRLEVBQUU7Z0JBQzdELElBQUksRUFBRSxNQUFNO2dCQUNaLEdBQUcsRUFBRSxhQUFhO2dCQUNsQixXQUFXLEVBQUUsUUFBUTthQUN0QixDQUFDO1lBQ0YsTUFBTSxFQUFFLEdBQUcsTUFBTSxJQUFJLGlCQUFHLENB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