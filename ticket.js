const {
  Client,
  MessageActionRow,
  MessageButton,
  Modal,
  TextInputComponent,
  WebhookClient,
} = require("discord.js");
const discord = require('discord.js');
const settings = require("./config/config.json");
const config = require("./config/emoji.json");
const { MessageEmbed } = require('discord.js')

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  // code

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
      if (interaction.commandName == "ping") {
        interaction.reply({
          content: `Pong :: ${client.ws.ping}`,
          ephemeral: true,
        });
      } else if (interaction.commandName == "webshop") {
        interaction.reply({
          content: `https://premiumshop.rdcw.xyz`,
          ephemeral: true,
        });
      
      } else if (interaction.commandName == "setup") {
        let ticketChannel = interaction.guild.channels.cache.get(
          settings.ticketChannel
        );
        if (!ticketChannel) return;

        let embed = new MessageEmbed()
          .setColor("BLURPLE")
          .setAuthor({ name: 'PREMIUM SHOP', iconURL: 'https://cdn.discordapp.com/attachments/982675448507015199/989997624604123166/PREMIUM__SHOP_1.png', url: 'https://discord.gg/premiumshop' })
          .setTitle(`PREMIUM BOT Ticket`)
          .setImage(`https://cdn.discordapp.com/attachments/989580985802821695/990451081463078942/ezgif.com-gif-maker_3.gif`)
          .setDescription(`> <a:dhetr_034:990454073520160808>กดปุ่มข้างล่างเพื่อเปิดตั๋ว`)
          .setTimestamp()
          .addFields(
            { name: 'คำเตือน', value: '> <a:dhetr_034:990454073520160808>อย่ากดเล่น', inline: true },
            { name: 'คำเตือน', value: '> <a:dhetr_034:990454073520160808>งดทักแชทส่วนตัว', inline: true },
          )

          const newLocal = "";
          let btnrow = new MessageActionRow().addComponents([
          new MessageButton()
              .setCustomId("ticket_create")
              .setStyle("SECONDARY")
              .setLabel(`เปิดตั๋วติดต่อ`)
              .setEmoji(config.emojiticket),
          new MessageButton()
              .setCustomId("ticket_netflix")
              .setStyle("SECONDARY")
              .setLabel(`Netflix`)
              .setEmoji(config.emojinetflix),
          new MessageButton()
              .setCustomId("ticket_youtube")
              .setStyle("SECONDARY")
              .setLabel(`YOUTUBE`)
              .setEmoji(config.emojiyoutube),
          new MessageButton()
              .setCustomId("ping")
              .setStyle("SECONDARY")
              .setLabel(`เช็คปิงบอท`)
              .setEmoji(config.emojiping),
          new MessageButton()
          .setCustomId("V_ping")
              .setLabel("ห้ามเปิดเล่น!!")
              .setStyle("PRIMARY")
              .setEmoji(config.emojinv)
              .setDisabled(true)
          ]);
          await ticketChannel.send({
            embeds: [embed],
            components: [btnrow],
          });
  
          interaction.reply({
            content: `สร้างที่เปิดตั๋วในห้อง ${ticketChannel}`,
          });
        }
      }
  
      if (interaction.isButton()) {
        if (interaction.customId == "ping") {
          return interaction.reply({
          content: `> ปิงบอทอยู่ที่ \n> ${client.ws.ping} ms <a:112IBO:1006472678686871622> `,
          ephemeral: true,
          });
        } else if (interaction.customId == "webshop") {
          return interaction.reply({
          content: `> https://premiumshop.rdcw.xyz`,
          ephemeral: true,
          });
        } else if (interaction.customId == "facebook") {
          return interaction.reply({
          content: `> https://web.facebook.com/profile.php?id=100077753366333`,
          ephemeral: true,
          });
        } else if (interaction.customId == "ticket_netflix") {
          let embednf = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle('Netflix Premium')
          .setDescription('https://premiumshop.rdcw.xyz')
          .setImage(`https://cdn.discordapp.com/attachments/991453577098821722/1005907014863568936/netflix.png`)
          .setTimestamp()
          .setFooter({ text: 'BOT By KAMUISAD#9999', iconURL: 'https://cdn.discordapp.com/attachments/991453577098821722/994968327631933440/PREMIUM__SHOP_1.png' });
          return interaction.reply({
          content: `> ซื้อได้ที่เว็บเลย`,
          ephemeral: true,
          embeds: [embednf]
          });
        } else if (interaction.customId == "ticket_youtube") {
          let embedyt = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle('Youtube Premium')
          .setDescription('https://premiumshop.rdcw.xyz')
          .setImage(`https://media.discordapp.net/attachments/991453577098821722/1005675350119944274/images_3.jpeg`)
          .setTimestamp()
          .setFooter({ text: 'BOT By KAMUISAD#9999', iconURL: 'https://cdn.discordapp.com/attachments/991453577098821722/994968327631933440/PREMIUM__SHOP_1.png' });
          return interaction.reply({
          content: `> ซื้อได้ที่เว็บเลย`,
          ephemeral: true,
          embeds: [embedyt]
          });
        } else if (interaction.customId == "ticket_create") {
          const ticket_modal = new Modal()
            .setTitle("Ticket System")
            .setCustomId("ticket_modal");
  
          const user_reason = new TextInputComponent()
            .setCustomId("ticket_reason")
            .setLabel(`เติมเงิน-ซื้อยศหรือแจ้งปัญหา ?`.substring(0, 45))
            .setMinLength(3)
            .setMaxLength(100)
            .setRequired(true)
            .setStyle("PARAGRAPH");
  
          
          const row_user_reason = new MessageActionRow().addComponents(
            user_reason
          );
          ticket_modal.addComponents(row_user_reason);
  
          await interaction.showModal(ticket_modal);
        } else if (interaction.customId == "ticket_delete") {
          let ticketname = `ticket-${interaction.user.id}`;
          let oldChannel = interaction.guild.channels.cache.find(
            (ch) => ch.name == ticketname
          );
          if (!oldChannel) return;
          interaction.member.roles.remove(settings.roledelete)
          client.channels.cache.get(settings.log).send({content: `> <@${interaction.user.id}> \n> ได้สั่งลบห้องติดต่อTICKET\n> ลบห้องสำเร็จ\n> บอทได้ลบยศ\n> <@&${settings.roledelete}>`})
          interaction.reply({
            content: `> <a:eddc749b9ea34304a37b65dc7aff36c3:990452858782617641>  กำลังลบห้อง อีก5วินาที`,
          });
          setTimeout(() => {
            oldChannel.delete().catch((e) => {});
          }, 5000);
        }
      } 
  
      if (interaction.isModalSubmit()) {
        const ticket_user_reason =
          interaction.fields.getTextInputValue("ticket_reason");
  
        let ticketname= `Ticket-${interaction.user.id}`;
        await interaction.guild.channels
          .create(ticketname, {
            type: "GUILD_TEXT",
            topic: `ticket of ${interaction.user.tag}`,
            parent: settings.ticketCategory || interaction.channel.parentId,
            permissionOverwrites: [
              {
                id: interaction.guildId,
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              },
              {
                id: interaction.user.id,
                allow: [
                  "VIEW_CHANNEL",
                  "SEND_MESSAGES",
                  "READ_MESSAGE_HISTORY",
                  "EMBED_LINKS",
                  "ATTACH_FILES",
                  "MANAGE_CHANNELS",
                  "ADD_REACTIONS",
                  "USE_APPLICATION_COMMANDS",
                ],
              },
              {
                id: client.user.id,
                allow: ["ADMINISTRATOR", "MANAGE_CHANNELS"],
              },
            ],
          })
          .then(async (ch) => {
            let embed = new MessageEmbed()
              .setColor("BLURPLE")
              .setImage(`https://cdn.discordapp.com/attachments/989580985802821695/990451081463078942/ezgif.com-gif-maker_3.gif`)
              .setTimestamp()
              .addFields(
                { name: 'ผู้เปิดห้องติดต่อ', value:  `${interaction.member}`, inline: true },
                { name: 'หมายเหตุ', value: `> ${ticket_user_reason}`, inline: true },
              )
            let btnrow = new MessageActionRow().addComponents([
              new MessageButton()
                .setCustomId(`ticket_delete`)
                .setStyle("DANGER")
                .setEmoji(config.emojidelete)
                .setLabel(`Delete`),
                new MessageButton()
                .setCustomId(`facebook`)
                .setLabel('FACEBOOK')
                .setEmoji(config.emojifacebook)
                .setStyle('SECONDARY'),
                new MessageButton()
                .setCustomId(`webshop`)
                .setLabel('WEBSHOP')
                .setEmoji(config.emojiwebshop)
                .setStyle('SECONDARY'),
  
            ]);
            interaction.member.roles.cache.has(settings.roleadd)
            interaction.member.roles.add(settings.roleadd)
            client.channels.cache.get(settings.log).send({content: `> <@${interaction.user.id}> \n> ได้สั่งเปิดห้องติดต่อTICKET \n> หมายเหตุที่เปิด ${ticket_user_reason} \n> บอทได้เพิ่มยศ\n> <@&${settings.roleadd}>`})
            ch.send({
              content: `> ผู้รับเรื่อง${settings.ticketRoles.map(
                (r) => `<@&${r}> <a:ibo_emoji_22:990432909288673380>  `
              )}`,
              embeds: [embed],
              components: [btnrow],
            });
            interaction.reply({
              content: `> สร้างห้องติดต่อสำเร็จ ${ch}`,
              ephemeral: true,
            });
          })
          .catch((e) => {
            interaction.reply({
              content: `Error \n \`${e.message}\``,
              ephemeral: true,
            });
           
          });
      }
    });
  };  