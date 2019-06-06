import connect from "connect"
import serveStatic from "serve-static"
import Renderer from "./renderer"
import * as util from "./util"
import chalk from "chalk"
import LRU from "lru-cache"

const ctx = util.cwd(".")
const config = JSON.parse(util.read(util.resolve(ctx, 'config.json')))
const path = "./docs"
const port = 4000

const renderer = new Renderer({
  template: util.read(util.resolve(ctx, config.template)),
  config: config.docs,
});
const server = connect();
const cached = new LRU(config.maxAge || 0);

server.use(serveStatic(path));
server.use(function (req, res) {
  serveStatic(path)(req, res, function () {
    if (
      /\.(jpg|jpeg|gif|png|svg|ico|mp4|webm|ogg|ogv|js|css|md)(?:\?v=[0-9.]+)?$/.test(
        req.url
      )
    ) {
      res.writeHead(404);
      res.end();
    }

    Promise.resolve(cached.get(req.url) || renderer.renderToString(req.url))
      .then(function (html) {
        cached.set(req.url);
        res.end(html);
      })
      .catch(function (err) {
        console.error(err);
        res.writeHead(404);
        res.end();
      });
  });
});
server.listen(port);

const msg =
  "\n" +
  chalk.blue("[SSR]") +
  " Serving " +
  chalk.green(`${path}`) +
  " now.\n" +
  "Listening at " +
  chalk.green(`http://localhost:${port}`) +
  "\n";

console.log(msg);
