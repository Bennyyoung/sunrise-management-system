"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
exports.DatabaseConfig = {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name',
    autoIndex: false,
    connectionName: 'your_connection_name',
};
//# sourceMappingURL=database.config.js.map