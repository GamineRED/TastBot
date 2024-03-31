import { Client, ClientEvents } from "discord.js"

interface TastBotEvent<K extends keyof ClientEvents = unknown> {
	type: typeof K;
	init?(client: Client);
	once?: boolean;
	execute(...args: ClientEvents[K]);
}
