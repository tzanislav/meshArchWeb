const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const sitemap = new SitemapStream({ hostname: 'https://mesharch.studio' });

const writeStream = createWriteStream('../FrontEnd/public/sitemap.xml');
sitemap.pipe(writeStream);

sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
sitemap.write({ url: '/blog', changefreq: 'weekly', priority: 0.8 });

sitemap.end();

streamToPromise(sitemap).then(() =>
  console.log('Sitemap has been generated!')
);
