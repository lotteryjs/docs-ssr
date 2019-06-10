
### 介绍

这个项目是从 [docsify-server-renderer](https://github.com/docsifyjs/docsify/tree/develop/packages/docsify-server-renderer) 抽出来方便以后定制的。

### Awesome

[docsify.lotteryjs.com](https://github.com/lotteryjs/docsify.lotteryjs.com)

### Debug(VSCode)
```sh
npm run dev 
# F5 附加到进程，下断点调试即可
```

### How to use this image

```sh
docker run -v $PWD/pm2.json:/data/site/pm2.json -v $PWD/config.json:/data/site/config.json -v $PWD/template.html:/data/site/template.html -p 4000:4000 lotteryjs/docs-ssr
```

### Refs

[docker-pm2](https://github.com/keymetrics/docker-pm2)