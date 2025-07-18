//* Custom modules
import { logger } from "../../../lib/winston.ts";

//* Models
import User from "../../../models/user.ts";

//* Types
import type { Request, Response } from "express";

const deleteCurrentUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    
    try {
        await User.deleteOne({ _id: userId });

        logger.info('A user account has been deleted', userId);

        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({
            code: 'ServerError',
            message: 'Internal Server Error',
            error: err,
        });

        logger.error('Error while deleting current user account', err);
    }
}

export default deleteCurrentUser;