FROM ubuntu:latest

ENV username admin
ENV password pass
ENV rootpassword toor

RUN useradd -ms /bin/bash $username
RUN echo $username:$password | chpasswd
RUN adduser $username sudo

RUN apt-get update

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get install -y --no-install-recommends apt-utils

RUN apt-get install -y sudo
RUN apt-get install -y curl
RUN apt-get install -y build-essential
RUN apt-get install -y nano
RUN apt-get install -y nodejs
RUN npm install npm@latest -g

RUN gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB && \
    \curl -L https://get.rvm.io | bash -s stable --ruby && \
    adduser $username rvm

RUN echo root:$rootpassword | chpasswd

COPY ./* /
RUN chmod 744 /*
ENTRYPOINT ["/entry_point.sh"]

USER $username