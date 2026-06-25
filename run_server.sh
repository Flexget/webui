#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$SCRIPT_DIR/.webui.pid"
LOG_FILE="$SCRIPT_DIR/.webui.log"

if [ -z "${1:-}" ]; then
  echo "Usage: run_server <flexget_server_url>"
  echo "  e.g. run_server http://192.168.1.228:5050"
  exit 1
fi

FLEXGET_SERVER="$1"

if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "WebUI is already running (PID $(cat "$PID_FILE"))"
  echo "  Log:  $LOG_FILE"
  echo "  Stop: stop-webui"
  exit 0
fi

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

cd "$SCRIPT_DIR"

SERVER="$FLEXGET_SERVER" yarn start >"$LOG_FILE" 2>&1 &
echo $! >"$PID_FILE"

echo "WebUI started (PID $!)"
echo "  URL:  http://localhost:8000"
echo "  API:  $FLEXGET_SERVER"
echo "  Log:  $LOG_FILE"
echo "  Stop: stop-webui"
