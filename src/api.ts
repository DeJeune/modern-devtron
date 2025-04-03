import { app, session } from 'electron';
import * as path from 'path';

class ModernDevtron {
  constructor() {
    // Nothing to initialize
  }

  /**
   * Install the Modern Devtron extension into the Electron application
   */
  install = (): boolean => {
    try {
      // Only allow installation in the main process
      if (process.type !== 'browser') {
        throw new Error('Modern Devtron can only be installed from the main process');
      }

      const extensionPath = path.resolve(__dirname);
      console.log(`Installing Modern Devtron from ${extensionPath}`);

      // Wait for app to be ready
      if (app.isReady()) {
        session.defaultSession.loadExtension(extensionPath, {
          allowFileAccess: true
        });
      } else {
        app.on('ready', () => {
          session.defaultSession.loadExtension(extensionPath, {
            allowFileAccess: true
          });
        });
      }

      return true;
    } catch (error) {
      console.error('Failed to install Modern Devtron:', error);
      return false;
    }
  };

  /**
   * Uninstall the Modern Devtron extension
   */
  uninstall = (): boolean => {
    try {
      // Only allow uninstallation in the main process
      if (process.type !== 'browser') {
        throw new Error('Modern Devtron can only be uninstalled from the main process');
      }

      if (app.isReady()) {
        // Get the extensions and find Modern Devtron
        const extensions = session.defaultSession.getAllExtensions();
        const devtronExt = extensions.find(ext => ext.name === 'Modern Devtron');
        
        if (devtronExt) {
          console.log(`Uninstalling Modern Devtron with ID: ${devtronExt.id}`);
          session.defaultSession.removeExtension(devtronExt.id);
        } else {
          console.log('Modern Devtron extension not found');
        }
      }

      return true;
    } catch (error) {
      console.error('Failed to uninstall Modern Devtron:', error);
      return false;
    }
  };

  get path(): string {
    return __dirname;
  }
}

// Export a singleton instance
const instance = new ModernDevtron();
export default instance; 