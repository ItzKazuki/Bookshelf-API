import Hapi from '@hapi/hapi';
import routers from './router.js';
import { danger, error, success } from './utils.js';
import config from './config.js';

const init = async () => {
  // get from .env
  const host = config.APP_ENV == 'devlopment' ? 'localhost' : '0.0.0.0';
  const port = config.APP_PORT ? config.APP_PORT : '9000'; // harusnya ini di cek APP_ENV nya apa, kalo dev maka port nya 9000 kalo prod maka 80.

  //init server
  const server = Hapi.server({
    port,
    host,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  // add router
  server.route(routers);

  if (config.APP_ENV == 'devlopment') {
    server.ext('onPreResponse', (req, h) => {

      console.log('\n')
      success(`--- Response to ${req.path} success ---`);

      return h.continue;
    });
  }

  await server.start();
  success(`server berhasil di jalankan ${server.info.uri}`)
}

/*global process*/
process.on('unhandledRejection', (err) => {
  error(err);
  process.exit(1);
});

danger('Starting server...');
if (config.APP_ENV == 'devlopment') {
  danger(`server dalam mode devlopment, ubah APP_ENV ke production di src/config.js jika sudah tidak dalam tahap devlopment`)
}
init();