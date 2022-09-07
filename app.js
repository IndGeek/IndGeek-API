const express = require("express");

const app = express();

app.use(express.json());


let Parser = require("rss-parser");
let parser = new Parser();
let Arr = [];

(async () => {
    let feed = await parser.parseURL("https://indgeek.com/feed");
    //   console.log(feed);

    feed.items.forEach(item => {
        // console.log(item.title + ':' + item.link)
        let tempSnippet = item.contentSnippet.split(" ").slice(0, -2).join(" ");
        Arr.push(
            item.title,
            item.creator,
            item.pubDate,
            item.link,
            item.categories,
            tempSnippet
        );
    });
console.log(Arr);
})();


app.get('/', (req, res)=>{
    res.json(Arr)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server started at PORT ${PORT}`);
});