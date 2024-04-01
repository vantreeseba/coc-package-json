import { commands, ExtensionContext, window } from 'coc.nvim';
import Commands from './commands';

export async function activate(context: ExtensionContext): Promise<void> {
  let { subscriptions } = context;

  Commands.forEach((cmd) => {
    var c = new cmd();
    window.showInformationMessage(`registering: ${c.title}`);
    subscriptions.push(commands.registerCommand(c.title, c.execute, c));
  });
}
