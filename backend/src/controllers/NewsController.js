const googleNewsAPI = require('google-news-json');

module.exports = {

    async get(req, res){
        await googleNewsAPI.getNews(googleNewsAPI.SEARCH, "lixo eletronico", "pt-BR", (err, response) => {
                return res.status(200).json({ success: response });
        });
    }

}