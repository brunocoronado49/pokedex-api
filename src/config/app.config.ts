export const EnvConfiguration = () => ({
  mongodb: process.env.MONGO_URL || '',
  port: process.env.PORT || 3001,
});
