const axios = require("axios");

module.exports = (req, res) => {
  function getLinks() {
    return axios(
      `https://api.pinboard.in/v1/posts/all?auth_token=${process.env.PINBOARD_TOKEN}&format=json`,
      { method: "Get", json: true, "content-type": "application/json" }
    )
      .then((res) => {
        return JSON.parse(res.data.toString().trim());
      })
      .then((json) => {
        const processlinks = json.filter((x) => {
			delete x.shared;
			delete x.toread;

          let tags = x.tags.split(" ");
          x.tags = tags;
          return x;
        });
        return processlinks;
      });
  }

  function getTags() {
    return axios(
      `https://api.pinboard.in/v1/tags/get?auth_token=${process.env.PINBOARD_TOKEN}&format=json`,
      { method: "Get", json: true, "content-type": "application/json" }
    )
      .then((res) => {
        return JSON.parse(res.data.toString().trim());
      })
      .then((json) => {
        let arr = [];
        for (let [key, value] of Object.entries(json)) {
          arr.push({ tagname: key, count: value });
        }
        return arr;
      });
  }

  axios.all([getLinks(), getTags()]).then(
    axios.spread(function (l, t) {
      res.json({ links: l, tagged: t });
    })
  );
};
