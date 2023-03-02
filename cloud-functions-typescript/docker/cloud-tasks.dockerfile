FROM python:3.11

WORKDIR /usr/src/app

RUN touch requirements.txt
RUN pip install gcloud-tasks-emulator
