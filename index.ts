import app from './src/app';

const start = async (): Promise<void> => {
  try {
    await app.listen({
      port: parseInt(process.env?.PORT || '8080', 10),
      host: '0.0.0.0',
    });
    console.log(`Server listening on ${(app.server.address() as any).port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
