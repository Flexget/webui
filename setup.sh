#!/usr/bin/env bash
set -euo pipefail

# Minimum required versions
NODE_MAJOR=16
YARN_VERSION="1.22.22"

log() { echo "[setup] $*"; }
err() { echo "[setup] ERROR: $*" >&2; exit 1; }

# Install nvm if not present
if ! command -v nvm &>/dev/null && [ ! -f "$HOME/.nvm/nvm.sh" ]; then
  log "Installing nvm..."
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi

# Load nvm
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck source=/dev/null
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

if ! command -v nvm &>/dev/null; then
  err "nvm not found after install — open a new shell and re-run this script"
fi

# Install and use the required Node version
log "Installing Node.js $NODE_MAJOR (LTS)..."
nvm install "$NODE_MAJOR"
nvm use "$NODE_MAJOR"
log "Node $(node --version)"

# Install Yarn classic (v1)
if ! command -v yarn &>/dev/null || [[ "$(yarn --version)" != 1.* ]]; then
  log "Installing Yarn $YARN_VERSION..."
  npm install -g "yarn@$YARN_VERSION"
fi
log "Yarn $(yarn --version)"

# Install project dependencies
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

log "Installing project dependencies..."
yarn install --frozen-lockfile

log ""
log "Setup complete. Available commands:"
log "  yarn start       — start the dev server"
log "  yarn build       — production build"
log "  yarn test        — run tests"
log "  yarn lint        — lint TypeScript/JavaScript"
