// Packages
const { MessageEmbed, WebhookClient } = require("discord.js");
const Twit = require("node-tweet-stream");

// Setup
// const config = JSON.parse(fs.readFileSync("../config.json", "utf8"));
const { twitterConsumerKey, twitterConsumerSecret, twitterAccessTokenKey, twitterAccessTokenSecret, twitterfollowing, urltweetlog } = require("../config.json");
const tweetpost = new WebhookClient({url: urltweetlog});

// Clients
const t = new Twit({
    consumer_key: twitterConsumerKey,
    consumer_secret: twitterConsumerSecret,
    //app_only_auth:true,
    //access_token_key:twitterAccessTokenKey,
    //access_token_secret:twitterAccessTokenSecret
    token: twitterAccessTokenKey,
    token_secret: twitterAccessTokenSecret
});

module.exports = (client) => {
// Tweet Listener + Post
t.on('tweet', function (tweet) {
    let media = tweet.entities.media;
    chatPost(tweet.text, tweet.user.screen_name, `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`, tweet.created_at, tweet.user.profile_image_url, media);
})

let track = twitterfollowing;
for (var i = 0; i < track.length; i++) {
    t.follow(track[i]);
    console.log(`[TWITTER] Following Twitter User [ID]${track[i]}`)
}

    // Functions
function chatPost(content, author, url, time, authorPfp, media) {
    const message = new MessageEmbed()
    .setTitle("New Tweet")
    .setColor("#1A91DA")
    .setDescription(content)
    .setAuthor({ name: `@${author}`, url:`https://twitter.com/${author}`, iconURL: authorPfp })
    .setFooter({ text: `Twitter - ${time}`, iconURL: "https://abs.twimg.com/favicons/twitter.ico" })
    .setURL(url);

    if (!!media) for (var j = 0; j < media.length; j++) message.setImage(media[j].media_url);

    // for (const __channel of channelsToPostTwitter.map(x => client.channels.cache.get(x))) 
    
    // __channel.send({embeds: [message]});

    tweetpost.send({ embeds: [message]});
}

}