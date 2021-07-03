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
const user_model_1 = __importDefault(require("./../models/user.model"));
class UserController {
    static user(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOne({ userId: userId })
                .populate('disciplines')
                .populate({
                path: 'department',
                model: 'Department',
                populate: {
                    path: 'faculty',
                    model: 'Faculty'
                }
            })
                .populate('position')
                .populate('workFocus');
        });
    }
    static users() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.find({})
                .populate('disciplines')
                .populate({
                path: 'department',
                model: 'Department',
                populate: {
                    path: 'faculty',
                    model: 'Faculty'
                }
            })
                .populate('position')
                .populate('workFocus');
        });
    }
    static usersByPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.find({ positionId: 'HOD' })
                .populate('disciplines')
                .populate({
                path: 'department',
                model: 'Department',
                populate: {
                    path: 'faculty',
                    model: 'Faculty'
                }
            })
                .populate('position')
                .populate('workFocus');
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new user_model_1.default(user).save();
        });
    }
    static updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOneAndUpdate({ userId: user.userId }, {
                $set: user
            }, { upsert: true });
        });
    }
    static deleteUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOneAndRemove({ userId: user.userId });
        });
    }
    static exists(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = false;
            let data = yield user_model_1.default.countDocuments({
                userId: userId
            });
            if (data !== 0) {
                result = true;
            }
            return result;
        });
    }
    static assignProfilePicture(userId, photoUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOneAndUpdate({ userId: userId }, {
                $set: {
                    photoUrl: photoUrl
                }
            }, { upsert: true });
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvdXNlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBTUEsd0VBQTBDO0FBRTFDLE1BQXFCLGNBQWM7SUFDMUIsTUFBTSxDQUFPLElBQUksQ0FBQyxNQUFjOztZQUNyQyxPQUFPLE1BQU0sb0JBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUM7aUJBQzFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7aUJBQ3ZCLFFBQVEsQ0FBQztnQkFDUixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsU0FBUztvQkFDZixLQUFLLEVBQUUsU0FBUztpQkFDakI7YUFDRixDQUFDO2lCQUNELFFBQVEsQ0FBQyxVQUFVLENBQUM7aUJBQ3BCLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzQixDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sS0FBSzs7WUFDdkIsT0FBTyxNQUFNLG9CQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztpQkFDdkIsUUFBUSxDQUFDLGFBQWEsQ0FBQztpQkFDdkIsUUFBUSxDQUFDO2dCQUNSLElBQUksRUFBRSxZQUFZO2dCQUNsQixLQUFLLEVBQUUsWUFBWTtnQkFDbkIsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxTQUFTO29CQUNmLEtBQUssRUFBRSxTQUFTO2lCQUNqQjthQUNGLENBQUM7aUJBQ0QsUUFBUSxDQUFDLFVBQVUsQ0FBQztpQkFDcEIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNCLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxlQUFlOztZQUNqQyxPQUFPLE1BQU0sb0JBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7aUJBQzFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7aUJBQ3ZCLFFBQVEsQ0FBQztnQkFDUixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsU0FBUztvQkFDZixLQUFLLEVBQUUsU0FBUztpQkFDakI7YUFDRixDQUFDO2lCQUNELFFBQVEsQ0FBQyxVQUFVLENBQUM7aUJBQ3BCLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzQixDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sVUFBVSxDQUFDLElBQVc7O1lBQ3hDLE9BQU8sTUFBTSxJQUFJLG9CQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckMsQ0FBQztLQUFBO0lBQ00sTUFBTSxDQUFPLFVBQVUsQ0FBQyxJQUFXOztZQUN4QyxPQUFPLE1BQU0sb0JBQUksQ0FBQyxnQkFBZ0IsQ0FDaEMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUN2QjtnQkFDRSxJQUFJLEVBQUUsSUFBSTthQUNYLEVBQ0QsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQ2pCLENBQUM7UUFDSixDQUFDO0tBQUE7SUFDTSxNQUFNLENBQU8sVUFBVSxDQUFDLElBQVc7O1lBQ3hDLE9BQU8sTUFBTSxvQkFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQzVELENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxNQUFNLENBQUMsTUFBYzs7WUFDdkMsSUFBSSxNQUFNLEdBQVksS0FBSyxDQUFDO1lBQzVCLElBQUksSUFBSSxHQUFXLE1BQU0sb0JBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQzNDLE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUNkLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDZjtZQUVELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUNNLE1BQU0sQ0FBTyxvQkFBb0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0I7O1lBQ3ZFLE9BQU8sTUFBTSxvQkFBSSxDQUFDLGdCQUFnQixDQUNoQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFDbEI7Z0JBQ0UsSUFBSSxFQUFFO29CQUNKLFFBQVEsRUFBRSxRQUFRO2lCQUNuQjthQUNGLEVBQ0QsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQ2pCLENBQUM7UUFDSixDQUFDO0tBQUE7Q0FDRjtBQWhGRCxpQ0FnRkMifQ==