#!/usr/bin/env bash
# Install Docker Engine from the official repository inside Ubuntu / WSL2.
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
  echo 'Esegui questo script con sudo oppure con wsl -u root.' >&2
  exit 1
fi

. /etc/os-release
if [ "$ID" != ubuntu ]; then
  echo 'Questo script richiede Ubuntu.' >&2
  exit 1
fi
case "${UBUNTU_CODENAME:-$VERSION_CODENAME}" in
  jammy|noble|resolute) ;;
  *) echo 'Versione di Ubuntu non prevista: usare Ubuntu 24.04 LTS.' >&2; exit 1 ;;
esac

for package in docker.io docker-compose docker-compose-v2 docker-doc docker-buildx podman-docker containerd runc; do
  if dpkg-query -W -f='${Status}' "$package" 2>/dev/null | grep -q 'install ok installed'; then
    echo "Pacchetto in conflitto: $package. Risolvere prima di proseguire." >&2
    exit 1
  fi
done

apt-get update
apt-get install -y ca-certificates curl
install -m 0755 -d /etc/apt/keyrings
curl --fail --silent --show-error --location https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
cat > /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: ${UBUNTU_CODENAME:-$VERSION_CODENAME}
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
if [ -d /run/systemd/system ]; then
  systemctl enable --now docker
else
  service docker start
fi
docker version
docker compose version
docker run --rm hello-world
