import fs from 'fs';
import { workspace, window, Command } from 'coc.nvim';
import path from 'path';

export class RunPackageJsonScript implements Command {
  public readonly title = 'package-json.runPackageJsonScript';
  public readonly command = 'package-json.runPackageJsonScript';

  public constructor() {}

  public async execute(): Promise<void> {
    let root = workspace.root;
    let jsonPath = path.join(root, 'package.json');

    let content = fs.readFileSync(jsonPath, { encoding: 'UTF8' });
    let json = JSON.parse(content);

    let scripts = Object.keys(json.scripts);

    const picked = await window.showQuickPick(scripts, {
      title: 'Select script to run:',
      matchOnDescription: true,
    });

    const script = picked;

    window.openTerminal('npm run ' + script, {
      keepfocus: false,
      autoclose: false,
      cwd: root,
    });
  }
}
