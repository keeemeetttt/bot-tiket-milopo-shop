const { Client } = require("discord.js");
const { token, guildId } = require("./config/config.json");
const client = new Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
});
const express = require('express')
const app = express();
const port = 8080

app.get('/' , (req,res) => res.send('Working!'))
app.listen( port , () => 
  console.log(`Your app is listening a http://localhost:${port}`)
);

client.on("ready", async () => {
  client.user.setActivity('เปิดตั๋วเพื่อติดต่อแอดมิน ', { type: 'STREAMING' });
  console.log(`${client.user.username} is Online`);
  let guild = client.guilds.cache.get(guildId);
  if (guild) {
    await guild.commands.set([
      {
        name: "setup",
        description: `สร้างที่เปิดตั๋ว`,
        type: "CHAT_INPUT",
      },
    ]);
  }
  require("./ticket")(client);
});


client.login(token);