import path from 'node:path';
import fs from 'node:fs';
import { CacheType, Client, Events, Interaction, InteractionType } from 'discord.js';
import { TastBotEvent } from "./event";
import { TastBotInteractionCreate } from './interactionCreates/interactionCreate';

//interactionCreateフォルダの読み込み
const interactionCreatesPath = path.join(__dirname, './interactionCreates/');
const interactionCreateFiles = fs.readdirSync(interactionCreatesPath).filter(file => file.endsWith('.cts'));

const interactionCreates = new Map<InteractionType, TastBotInteractionCreate>();
for (const file of interactionCreateFiles) {
	const filePath = path.join(interactionCreatesPath, file)
	const interactionCreate = require(filePath) as TastBotInteractionCreate;

	interactionCreates.set(interactionCreate.type, interactionCreate);
}

//moduleの情報
module.exports = new class implements TastBotEvent<Events.InteractionCreate> {
	type = Events.InteractionCreate;
	//初期化関数
	init(client: Client) {
		for (const interactionCreate of interactionCreates.values()) {
			if (interactionCreate.init) interactionCreate.init(client);
		}
		
		console.log('interactionCreates initialize completed!');
	}
	execute(interaction: Interaction<CacheType>) {
		//interactionがcommandだった時の処理
		if (interaction.isCommand()) {
			const interactionCreate = interactionCreates.get(InteractionType.ApplicationCommand);
			interactionCreate?.execute(interaction)
		}

		if (interaction.isAutocomplete()) {
			const interactionCreate = interactionCreates.get(InteractionType.ApplicationCommand);
			if (interactionCreate?.autocomplete) interactionCreate.autocomplete(interaction);
		}
	}
};
