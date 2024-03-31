import { AutocompleteInteraction, CommandInteraction, SlashCommandBuilder } from "discord.js";

interface TastBotCommand {
	data: SlashCommandBuilder;
	init?(client: TastBotClient);
	autocomplete?(interaction: AutocompleteInteraction): Promise;
	global?: boolean;
	execute(interaction: CommandInteraction): Promise;
}
