FROM rust:1.67

ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8000

WORKDIR /usr/src/myapp
COPY . .

RUN cargo install --path .

CMD ["cargo", "run"]
