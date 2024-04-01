import { commands, ExtensionContext, window, listManager, workspace } from 'coc.nvim';
import Commands from './commands';
import { PackageJsonCommandsList } from './PackageJsonCommandsList';

export async function activate(context: ExtensionContext): Promise<void> {
  let { subscriptions } = context;

  Commands.forEach((cmd) => {
    var c = new cmd();
    window.showInformationMessage(`registering: ${c.title}`);
    subscriptions.push(commands.registerCommand(c.title, c.execute, c));
  });

  //   if (!isDisabled('tags')) {
  subscriptions.push(listManager.registerList(new PackageJsonCommandsList(workspace.nvim)));
  //   }
}
