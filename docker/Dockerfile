ARG REGISTRY_PREFIX=''
ARG CODENAME=focal

FROM ${REGISTRY_PREFIX}ubuntu:${CODENAME} as builder

ARG DEBIAN_FRONTEND=noninteractive
RUN apt update \
    && apt upgrade -y \
    && apt install --yes --no-install-recommends \
        curl \
        ca-certificates \
        git \
        dpkg \
        fakeroot

ARG NVM_VERSION=0.39.1
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh | bash

RUN . /root/.bashrc && nvm install node

COPY . /opt/blockly-example
WORKDIR /opt/blockly-example

RUN . /root/.bashrc && npm install
RUN . /root/.bashrc && npm run make

# ToDo: build win32
#
#RUN apt update \
#    && apt install --yes --no-install-recommends \
#        wine64 \
#        mono-complete
#
#RUN update-alternatives --install /usr/bin/wine64 wine64 /usr/bin/wine64-stable 1
#RUN . /root/.bashrc && npx electron-forge make --platform win32

ENTRYPOINT ["bash"]