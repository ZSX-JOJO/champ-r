import { promisify } from 'util';
import { exec } from 'child_process';

const runCommand = promisify(exec);

export async function execCmd(command: string, powershell = true) {
  try {
    let option = {
      shell: powershell ? `powershell.exe` : `cmd.exe`,
    };
    const { stderr, stdout } = await runCommand(command, option);
    if (stderr) {
      return Promise.reject(stderr);
    }

    return stdout;
  } catch (error) {
    return Promise.reject(error);
  }
}
