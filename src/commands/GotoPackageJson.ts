import { workspace, window, Command } from 'coc.nvim';
import path from 'path';

export class GotoPackageJson implements Command {
  public readonly title = 'package-json.gotoPackageJson';
  public readonly command = 'package-json.gotoPackageJson';

  public constructor() {}

  public async execute(): Promise<void> {
    let root = workspace.root;

    await goToProjectConfig(path.join(root, 'package.json'));
  }
}

async function goToProjectConfig(uri: string): Promise<void> {
  window.showMessage('Opening: ' + uri);
  await workspace.openResource(uri);
}
