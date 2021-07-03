"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbmZpZy9sb2dnZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUE2RTtBQUM3RSxNQUFNLEVBQ0osT0FBTyxFQUNQLFNBQVMsRUFDVCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFdBQVcsRUFDWCxRQUFRLEVBQ1IsTUFBTSxFQUNQLEdBQUcsZ0JBQU0sQ0FBQztBQUVYLDBDQUEwQztBQUMxQyxNQUFNLFlBQVksR0FBRztJQUNuQixNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksRUFBRSxDQUFDO1FBQ1AsSUFBSSxFQUFFLENBQUM7UUFDUCxJQUFJLEVBQUUsQ0FBQztRQUNQLElBQUksRUFBRSxDQUFDO1FBQ1AsS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLEVBQUUsQ0FBQztRQUNULE9BQU8sRUFBRSxDQUFDO1FBQ1YsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsT0FBTztRQUNiLEtBQUssRUFBRSxNQUFNO1FBQ2IsTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxNQUFNO1FBQ2IsS0FBSyxFQUFFLFNBQVM7S0FDakI7Q0FDRixDQUFDO0FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQy9ELE9BQU8sR0FBRyxTQUFTLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxPQUFPLEVBQUUsQ0FBQztBQUN4RCxDQUFDLENBQUMsQ0FBQztBQUNILE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNoRSxPQUFPLGVBQWUsU0FBUzsyQkFDTixLQUFLOzBCQUNOLEtBQUs7MEJBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0FBQ3BELENBQUMsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBb0M7SUFDeEQsUUFBUSxFQUFFLGdCQUFnQjtJQUMxQixLQUFLLEVBQUUsT0FBTztJQUNkLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsT0FBTyxFQUFFLEVBQUU7SUFDWCxNQUFNLEVBQUUsT0FBTyxDQUNiLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUMxQixTQUFTLEVBQUUsRUFDWCxXQUFXLEVBQUUsRUFDYixRQUFRLEVBQUUsQ0FDWDtDQUNGLENBQUM7QUFDRixNQUFNLG1CQUFtQixHQUFvQztJQUMzRCxRQUFRLEVBQUUsbUJBQW1CO0lBQzdCLEtBQUssRUFBRSxTQUFTO0lBQ2hCLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsT0FBTyxFQUFFLEVBQUU7SUFDWCxNQUFNLEVBQUUsT0FBTyxDQUNiLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUMxQixTQUFTLEVBQUUsRUFDWCxXQUFXLEVBQUUsRUFDYixRQUFRLEVBQUUsQ0FDWDtDQUNGLENBQUM7QUFDRixNQUFNLGNBQWMsR0FBdUM7SUFDekQsS0FBSyxFQUFFLE1BQU07SUFDYixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLE1BQU0sRUFBRSxPQUFPLENBQ2IsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQzFCLFNBQVMsRUFBRSxFQUNYLFdBQVcsRUFBRSxFQUNiLFFBQVEsRUFBRSxFQUNWLFFBQVEsQ0FDVDtDQUNGLENBQUM7QUFFRixzQ0FBc0M7QUFDdEMsTUFBTSxNQUFNLEdBQUcsc0JBQVksQ0FBQztJQUMxQixLQUFLLEVBQUUsTUFBTTtJQUNiLE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTTtJQUMzQixXQUFXLEVBQUUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFO0lBQ3pDLFVBQVUsRUFBRTtRQUNWLElBQUksb0JBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDckMsSUFBSSxvQkFBVSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUN4QyxJQUFJLG9CQUFVLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztLQUN2QztJQUNELFdBQVcsRUFBRSxJQUFJO0NBQ2xCLENBQUMsQ0FBQztBQUdNLHdCQUFNO0FBRmYsbUJBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMifQ==