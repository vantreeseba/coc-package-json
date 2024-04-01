import path from 'path';
import fs from 'fs';
import colors from 'colors/safe';
import { IList, ListAction, ListContext, ListItem, Neovim, workspace } from 'coc.nvim';

// look here for more info: https://github.com/neoclide/coc-lists/blob/master/src/index.ts

export class PackageJsonCommandsList implements IList {
  public readonly name = 'packagecommands';
  public readonly description = 'commands from package.json list';
  public readonly defaultAction = 'run';
  public actions: ListAction[] = [];

  constructor(private nvim: Neovim) {
    this.actions.push({
      name: 'run',
      execute: (item) => {
        if (Array.isArray(item)) return;
      },
    });
  }

  public async loadItems(_context: ListContext): Promise<ListItem[]> {
    let root = workspace.root;
    let jsonPath = path.join(root, 'package.json');

    let content = fs.readFileSync(jsonPath, { encoding: 'UTF8' });
    let json = JSON.parse(content);

    let list = Object.entries(json.scripts);

    return list.map(([key, value]) => {
      return {
        label: `${colors.grey(key)}:\t${colors.green(value as string)}`,
        filterText: key,
        data: { name: key },
      };
    });
  }
}
