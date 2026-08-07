import { app, startApp } from './app';

const port = process.env.PORT || 3000;

startApp()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start app', error);
    process.exit(1);
  });
