"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/* eslint-disable @typescript-eslint/restrict-template-expressions */
const winston_1 = require("winston");
const { combine, timestamp, label, json, prettyPrint, colorize, printf } = winston_1.format;
// Configuration (levels, transports, etc)
const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        help: 2,
        data: 3,
        info: 4,
        debug: 5,
        prompt: 6,
        verbose: 7,
        input: 8,
        trace: 9
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        help: 'cyan',
        data: 'grey',
        info: 'green',
        debug: 'blue',
        prompt: 'grey',
        verbose: 'cyan',
        input: 'grey',
        trace: 'magenta'
    }
};
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const myFormat2 = printf(({ level, message, label, timestamp }) => {
    return `Timestamp:  ${timestamp} 
            Label:      [${label}] 
            Level:      ${level} 
            Message:    ${JSON.stringify(message)}`;
});
const errorFileOptions = {
    filename: 'logs/error.log',
    level: 'error',
    handleExceptions: true,
    options: {},
    format: combine(label({ label: 'LOGGER' }), timestamp(), prettyPrint(), colorize())
};
const combinedFileOptions = {
    filename: 'logs/combined.log',
    level: 'verbose',
    handleExceptions: true,
    options: {},
    format: combine(label({ label: 'LOGGER' }), timestamp(), prettyPrint(), colorize())
};
const consoleOptions = {
    level: 'info',
    handleExceptions: true,
    format: combine(label({ label: 'LOGGER' }), timestamp(), prettyPrint(), colorize(), myFormat)
};
// Create logger and attach transports
const logger = winston_1.createLogger({
    level: 'info',
    levels: customLevels.levels,
    defaultMeta: { application: 'eworkload' },
    transports: [
        new winston_1.transports.File(errorFileOptions),
        new winston_1.transports.File(combinedFileOptions),
        new winston_1.transports.Console(consoleOptions)
    ],
    exitOnError: true
});
exports.logger = logger;
winston_1.addColors(customLevels.colors);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25maWcvbG9nZ2VyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBcUU7QUFDckUscUNBQTZFO0FBQzdFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxnQkFBTSxDQUFDO0FBRWxGLDBDQUEwQztBQUMxQyxNQUFNLFlBQVksR0FBRztJQUNwQixNQUFNLEVBQUU7UUFDUCxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksRUFBRSxDQUFDO1FBQ1AsSUFBSSxFQUFFLENBQUM7UUFDUCxJQUFJLEVBQUUsQ0FBQztRQUNQLElBQUksRUFBRSxDQUFDO1FBQ1AsS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLEVBQUUsQ0FBQztRQUNULE9BQU8sRUFBRSxDQUFDO1FBQ1YsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLEVBQUUsQ0FBQztLQUNSO0lBQ0QsTUFBTSxFQUFFO1FBQ1AsS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsT0FBTztRQUNiLEtBQUssRUFBRSxNQUFNO1FBQ2IsTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxNQUFNO1FBQ2IsS0FBSyxFQUFFLFNBQVM7S0FDaEI7Q0FDRCxDQUFDO0FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ2hFLE9BQU8sR0FBRyxTQUFTLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxPQUFPLEVBQUUsQ0FBQztBQUN2RCxDQUFDLENBQUMsQ0FBQztBQUNILE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNqRSxPQUFPLGVBQWUsU0FBUzsyQkFDTCxLQUFLOzBCQUNOLEtBQUs7MEJBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0FBQ3BELENBQUMsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBb0M7SUFDekQsUUFBUSxFQUFFLGdCQUFnQjtJQUMxQixLQUFLLEVBQUUsT0FBTztJQUNkLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsT0FBTyxFQUFFLEVBQUU7SUFDWCxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDO0NBQ25GLENBQUM7QUFDRixNQUFNLG1CQUFtQixHQUFvQztJQUM1RCxRQUFRLEVBQUUsbUJBQW1CO0lBQzdCLEtBQUssRUFBRSxTQUFTO0lBQ2hCLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsT0FBTyxFQUFFLEVBQUU7SUFDWCxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDO0NBQ25GLENBQUM7QUFDRixNQUFNLGNBQWMsR0FBdUM7SUFDMUQsS0FBSyxFQUFFLE1BQU07SUFDYixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsUUFBUSxDQUFDO0NBQzdGLENBQUM7QUFFRixzQ0FBc0M7QUFDdEMsTUFBTSxNQUFNLEdBQUcsc0JBQVksQ0FBQztJQUMzQixLQUFLLEVBQUUsTUFBTTtJQUNiLE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTTtJQUMzQixXQUFXLEVBQUUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFO0lBQ3pDLFVBQVUsRUFBRTtRQUNYLElBQUksb0JBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDckMsSUFBSSxvQkFBVSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUN4QyxJQUFJLG9CQUFVLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztLQUN0QztJQUNELFdBQVcsRUFBRSxJQUFJO0NBQ2pCLENBQUMsQ0FBQztBQUdNLHdCQUFNO0FBRmYsbUJBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMifQ==