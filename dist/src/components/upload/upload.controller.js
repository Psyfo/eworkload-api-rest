"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */ const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const mkdirp_1 = require("mkdirp");
const academic_administration_activity_model_1 = __importDefault(require("../activity/academic-administration/academic-administration-activity.model"));
const research_activity_model_1 = __importDefault(require("../activity/research/research-activity.model"));
const upload_model_1 = __importDefault(require("./upload.model"));
const user_controller_1 = __importDefault(require("../user/user.controller"));
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
    static async uploadAcademicAdministrationEvidenceAWS(file, userId, activityId) {
        const { createReadStream, filename, mimetype } = await file;
        const stream = createReadStream();
        // Configure S3
        const params = {
            Bucket: 'eworkload',
            Key: `${userId}/evidence/academic-administration/${filename}`,
            Body: stream,
            ACL: 'public-read',
            ContentType: mimetype
        };
        const s3 = await new aws_sdk_1.default.S3({
            accessKeyId: 'AKIAJS6HEGWGJTMTSNGQ',
            secretAccessKey: '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',
            region: 'eu-west-2'
        });
        // Upload files to the bucket
        return await s3.upload(params, async function (err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
            await academic_administration_activity_model_1.default.findOneAndUpdate({ activityId: activityId }, { $set: { evidence: data.Location } }, { upsert: true });
            console.log('Academic Administration evidence updated');
            return { location: data.Location };
        });
    }
    static async uploadResearchEvidenceAWS(file, userId, activityId) {
        const { createReadStream, filename, mimetype } = await file;
        const stream = createReadStream();
        // Configure S3
        const params = {
            Bucket: 'eworkload',
            Key: `${userId}/evidence/research/${filename}`,
            Body: stream,
            ACL: 'public-read',
            ContentType: mimetype
        };
        const s3 = await new aws_sdk_1.default.S3({
            accessKeyId: 'AKIAJS6HEGWGJTMTSNGQ',
            secretAccessKey: '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',
            region: 'eu-west-2'
        });
        // Upload files to the bucket
        return new Promise((resolve, reject) => {
            return s3.upload(params, async (err, data) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                if (data) {
                    console.log(`File uploaded successfully. ${data.Location}`);
                    // Update evidence url on activity
                    await research_activity_model_1.default.findOneAndUpdate({ activityId: activityId }, { $set: { evidence: data.Location } }, { upsert: true });
                    console.log('Research evidence updated');
                    return resolve(data.Location);
                }
            });
        });
    }
    static async uploadProfilePictureAWS(file, userId) {
        const { createReadStream, filename, mimetype } = await file;
        const stream = await createReadStream();
        // Configure S3
        const params = {
            Bucket: 'eworkload',
            Key: `${userId}/profile-img/${filename}`,
            Body: stream,
            ACL: 'public-read',
            ContentType: mimetype
        };
        const s3 = await new aws_sdk_1.default.S3({
            accessKeyId: 'AKIAJS6HEGWGJTMTSNGQ',
            secretAccessKey: '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',
            region: 'eu-west-2'
        });
        // Upload files to the bucket
        return new Promise((resolve, reject) => {
            return s3.upload(params, async (err, data) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                if (data) {
                    console.log(`File uploaded successfully. ${data.Location}`);
                    // Update user photourl
                    const update = await user_controller_1.default.assignProfilePicture(userId, data.Location);
                    console.log('User photoUrl updated: ', update);
                    return resolve(data.Location);
                }
            });
        });
    }
    static async files() {
        return await upload_model_1.default.find({});
    }
    static async storeDB(file) {
        const { id, filename, mimetype, path } = file;
        try {
            let file = new upload_model_1.default({ id, filename, mimetype, path });
            return await file.save();
        }
        catch (err) {
            return err;
        }
    }
    static async uploadProfilePicture(file, userId) {
        const { createReadStream, filename, mimetype } = await file;
        const stream = await createReadStream();
        const { id, path } = await this.storeProfPicFS({
            stream,
            filename,
            userId
        });
        const photoUrl = `http://127.0.0.1:5000/${path}`;
        await user_controller_1.default.assignProfilePicture(userId, photoUrl);
        return await this.storeDB({ id, filename, mimetype, path });
    }
    static async storeProfPicFS({ stream, filename, userId }) {
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
    }
}
exports.default = UploadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy91cGxvYWQvdXBsb2FkLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0REFBNEQ7QUFDNUQsK0RBQStEO0FBQy9ELHVEQUF1RCxDQUFDLHNEQUEwQjtBQUNsRiw0Q0FBb0I7QUFDcEIsbUNBQThCO0FBRTlCLHdKQUF3SDtBQUN4SCwyR0FBNEU7QUFDNUUsa0VBQW9DO0FBQ3BDLDhFQUFxRDtBQUVyRCxhQUFhO0FBQ2IsaUJBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2pCLFdBQVcsRUFBRSxzQkFBc0I7SUFDbkMsZUFBZSxFQUFFLDBDQUEwQztDQUMzRCxDQUFDLENBQUM7QUFFSCwwREFBMEQ7QUFDMUQsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUMxQyxNQUFNLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDO0FBRTdDLGlDQUFpQztBQUNqQyxhQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QixhQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUV4QixNQUFxQixnQkFBZ0I7SUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxJQUFTLEVBQUUsTUFBYyxFQUFFLFVBQWtCO1FBQ3hHLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUM7UUFDNUQsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztRQUVsQyxlQUFlO1FBQ2YsTUFBTSxNQUFNLEdBQUc7WUFDZCxNQUFNLEVBQUUsV0FBVztZQUNuQixHQUFHLEVBQUUsR0FBRyxNQUFNLHFDQUFxQyxRQUFRLEVBQUU7WUFDN0QsSUFBSSxFQUFFLE1BQU07WUFDWixHQUFHLEVBQUUsYUFBYTtZQUNsQixXQUFXLEVBQUUsUUFBUTtT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