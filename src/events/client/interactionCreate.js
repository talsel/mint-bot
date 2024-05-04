module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client, args) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: `Oops, something went wrong! ❌`,
                    ephemeral: true
                });
            }
        } else if (interaction.isButton()) {
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId)
            if (!button) return new Error("This button does not work yet! ❌");

            try {
                await button.execute(interaction, client);
            } catch (error) {
                console.error(error);
            }
        } else if (interaction.isSelectMenu()) {
            const { selectMenus } = client;
            const { customId } = interaction;
            const menu = selectMenus.get(customId);
            if (!menu) return new Error("This menu does not work yet! ❌");

            try {
                await menu.execute(interaction, client);
            } catch (error) {
                console.error(error);
            }
        } else if (interaction.type == InteractionType.ModalSubmit) {
            const { modals } = client;
            const { customId } = interaction;
            const modal = modals.get(customId);
            if (!modal) return new Error("This modal does not work yet! ❌");

            try {
                await modal.execute(interaction, client);
            } catch (error) {
                console.error(error);
            }
        } else if (interaction.isContextMenuCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const contextCommand = commands.get(commandName);
            if (!contextCommand) return;

            try {
                await contextCommand.execute(interaction, client);
            } catch (error) {
                console.error(error);
            }
        } else if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                await command.autocomplete(interaction, client);
            } catch (error) {
                console.error(error);
            }
        }
    },
};