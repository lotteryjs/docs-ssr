
### How to use this image

```sh
docker run -v $PWD/pm2.json:/data/site/pm2.json -v $PWD/config.json:/data/site/config.json -v $PWD/template.html:/data/site/template.html -p 4000:4000 lotteryjs/docs-ssr
```