import { Client, Events } from "discord.js";
import { TastBotEvent } from "./event";

module.exports = new class implements TastBotEvent<Events.ClientReady> {
	type = Events.ClientReady;
	once = true;
	execute(client: Client<true>) {
		console.log(`Logged in as ${client.user.tag}`);
		client.user.setStatus("invisible");
	}
};
