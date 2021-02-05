// ts 项目直接引用 js 编写的库，会报错，需要 .d.ts 文件，一般通过类似 @types/superagent 的包安装
import superagent from 'superagent';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

interface Info {
  // title: string;
  teacher: string;
  num: number;
}

interface Res {
  time: number;
  data: Info[];
}

interface Json {
  [propName: number]: Info[];
}

class Crowller {
  private secret = 'secretKey';
  private url = 'https://www.imooc.com/search/?words=nodejs';

  constructor() {
    this.init();
  }

  async init() {
    const html = await this.getRawHtml();
    const info = this.getJsonInfo(html);
    const json = this.generateJson(info);
    const filePath = path.resolve(__dirname, '../data/course.json');
    fs.writeFileSync(filePath, JSON.stringify(json));
  }

  async getRawHtml() {
    const res = await superagent.get(this.url);
    return res.text;
  }

  getJsonInfo(html: string) {
    const $ = cheerio.load(html);
    const items = $('.search-item');
    const infos: Info[] = [];
    items.map((index, ele) => {
      const title = $(ele).find('.item-title').text();
      const teacher = $(ele)
        .find('.item-classify')
        .find('span')
        .eq(0)
        .children()
        .eq(0)
        .text();
      const num = Number(
        $(ele).find('.item-classify').find('span').eq(2).text()
      );
      infos.push({ teacher, num });
    });
    const res = {
      time: Date.now(),
      data: infos,
    };

    return res;
  }

  generateJson(info: Res) {
    const filePath = path.resolve(__dirname, '../data/course.json');
    let fileContent: Json = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[info.time] = info.data;
    return fileContent;
  }
}

const crowller = new Crowller();
