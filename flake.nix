{
  description = "Rust devShell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    rust-overlay.url = "github:oxalica/rust-overlay";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    rust-overlay,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        overlays = [(import rust-overlay)];
        pkgs = import nixpkgs {
          inherit system overlays;
        };
      in
        with pkgs; {
          devShells.default = mkShell {
            buildInputs = [
              openssl
              pkg-config
              rust-bin.beta.latest.default
            ];
            packages = [
              bashInteractive

              bun
              just
              turso-cli
              watchexec
              cargo-shuttle

              # LSPs
              nil
              taplo
              marksman
              htmx-lsp
              tailwindcss-language-server
              vscode-langservers-extracted
              nodePackages.typescript-language-server

              # Formatters
              alejandra
            ];
            # TODO: Read on shellHooks
            shellHook = ''
              # alias ls=eza
              # alias find=fd
            '';
          };
        }
    );
}
