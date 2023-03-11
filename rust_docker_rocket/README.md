# Rust Rocket on Docker Container 

```terminal
% cargo install cargo-shuttle
```

```terminal
% cargo new rocket_example --bin
% tree .
.
├── README.md
├── compose.yaml
├── rocket_example
│   ├── Cargo.toml
│   └── src
│       └── main.rs
└── rust.dockerfile
```

Cargo.tomlに[Rocket](https://rocket.rs/)を追加する。

```Cargo.toml
[package]
name = "rocket_example"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
rocket = "0.5.0-rc.2"
```

```rust_example/src/main.rs
#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}
```

```terminal
% cargo run
```