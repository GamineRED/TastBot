import { CacheType, Client, CommandInteraction, InteractionType } from "discord.js"

interface TastBotInteractionCreate {
	type: InteractionType;
	init?(client: Client);
	autocomplete?(interaction: AutocompleteInteraction<CacheType>): Promise;
	execute(interaction: CommandInteraction<CacheType>): Promise;
}
