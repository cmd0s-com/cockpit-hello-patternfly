
# Cockpit Hello World Plugin

A simple Hello World plugin for Cockpit Project using PatternFly 5.

## Overview

This plugin demonstrates how to create a basic Cockpit plugin with:
- PatternFly 5 UI components
- System information display
- Command execution capabilities

## Installation on Ubuntu 24.04 LTS

Follow these steps to install and run the plugin on Ubuntu 24.04 LTS:

### Prerequisites

1. Install Cockpit if not already installed:

```bash
sudo apt update
sudo apt install -y cockpit
sudo systemctl enable --now cockpit.socket
```

2. Install Node.js and npm:

```bash
sudo apt install -y nodejs npm
```

### Building and Installing the Plugin

1. Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/cockpit-hello-world.git
cd cockpit-hello-world
```

2. Install dependencies:

```bash
npm install
```

3. Build the plugin:

```bash
npm run build
```

4. Create a directory for the plugin in Cockpit's package directory:

```bash
sudo mkdir -p /usr/share/cockpit/hello-world
```

5. Copy the built files to the Cockpit packages directory:

```bash
sudo cp -r dist/* /usr/share/cockpit/hello-world/
```

6. Make sure the manifest.json file is properly set up in the root of your plugin directory:

```bash
sudo cp dist/manifest.json /usr/share/cockpit/hello-world/
```

7. Restart Cockpit:

```bash
sudo systemctl restart cockpit
```

### Accessing the Plugin

1. Open a web browser and go to: `https://your-server-ip:9090`
2. Log in with your system credentials
3. You should see a "Hello World" entry in the Cockpit menu

## Development

For development purposes, you can use:

```bash
npm run dev
```

Note that some Cockpit-specific features may not work in the development environment since they require the Cockpit runtime.

## Troubleshooting

- If the plugin doesn't appear in the menu, check if the manifest.json file is correctly placed in the plugin directory
- Verify file permissions: `sudo chmod -R 755 /usr/share/cockpit/hello-world/`
- Check Cockpit logs: `journalctl -u cockpit`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
