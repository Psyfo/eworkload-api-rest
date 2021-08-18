"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../components/user/user.model"));
const logger_config_1 = require("../config/logger.config");
class AuthController {
}
AuthController.login = async (req, res) => {
    try {
        const user = await user_model_1.default.findOne({ userId: req.body.userId });
        if (!user) {
            return res.status(400).json({ message: 'No result found' });
        }
        const isMatch = await bcryptjs_1.default.compare(req.body.password, user.password);
        if (isMatch) {
            const token = jsonwebtoken_1.default.sign({ userId: user.userId }, 'secret', {
                expiresIn: '1h'
            });
            const payload = {
                userId: user.userId,
                token: token,
                tokenExpiration: 1
            };
            logger_config_1.logger.info(JSON.stringify(payload));
            return res.status(200).json(payload);
        }
        else {
            return res.status(400).json({ message: 'Password is not correct' });
        }
    }
    catch (error) {
        logger_config_1.logger.error(error.message);
        return res.status(500).send('Server Error');
    }
};
AuthController.changePassword = async (req, res) => {
    // Compare passwords. Change and return result or throw error.
    const user = await user_model_1.default.findById({ _id: mongoose_1.default.Types.ObjectId(req.body._id) });
    if (!user) {
        return res.status(400).json({ message: 'No result found' });
    }
    const isMatch = await bcryptjs_1.default.compare(req.body.password, user.password);
    if (isMatch !== true) {
        return res.status(400).json({ message: 'Password is not correct' });
    }
    // Check that new password is different
    if (req.body.newPassword === req.body.password) {
        return res.status(400).json({ message: 'Cannot use the same password' });
    }
    //Hash new password and update
    const saltRounds = 10;
    const salt = bcryptjs_1.default.genSaltSync(saltRounds);
    const hash = bcryptjs_1.default.hashSync(req.body.newPassword, salt);
    await user_model_1.default.findOneAndUpdate({ userId: user.userId }, {
        $set: {
            password: hash
        }
    }, { upsert: true });
    return res.status(400).json({ message: `Password changed for user: ${user.userId}` });
};
exports.default = AuthController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F1dGgvYXV0aC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQTREO0FBQzVELCtEQUErRDtBQUMvRCx1REFBdUQ7QUFDdkQsd0RBQThCO0FBRTlCLGdFQUErQjtBQUMvQix3REFBZ0M7QUFFaEMsK0VBQWlEO0FBQ2pELDJEQUFpRDtBQUVqRCxNQUFNLGNBQWM7O0FBQ1osb0JBQUssR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBK0MsRUFBRTtJQUNqRyxJQUFJO1FBQ0gsTUFBTSxJQUFJLEdBQWlCLE1BQU0sb0JBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRTNFLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztTQUM1RDtRQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sa0JBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksT0FBTyxFQUFFO1lBQ1osTUFBTSxLQUFLLEdBQUcsc0JBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRTtnQkFDekQsU0FBUyxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7WUFDSCxNQUFNLE9BQU8sR0FBRztnQkFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLEtBQUssRUFBRSxLQUFLO2dCQUNaLGVBQWUsRUFBRSxDQUFDO2FBQ2xCLENBQUM7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