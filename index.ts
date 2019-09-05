import 'dotenv/config';
import setupApp from './src/app';

const port = 4000;

setupApp()
  .then(app =>
    app.listen(port, () =>
      console.log(`Server running on port http://localhost:${port}`)
    )
  )
  .catch((err: Error) => {
    console.error(err);
    process.exit(1);
  });
