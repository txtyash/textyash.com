{
  description = "Svelte devShell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        overlays = [];
        pkgs = import nixpkgs {
          inherit system overlays;
        };
      in
        with pkgs; {
          devShells.default = mkShell {
            buildInputs = [
            ];
            packages = [
              bashInteractive
              just
              watchexec
              nodejs_21
              tailwindcss

              # LSPs
              nil
              marksman
              tailwindcss-language-server
              # html, css, json
              vscode-langservers-extracted
              nodePackages.eslint
              nodePackages.prettier
              nodePackages.svelte-language-server
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
