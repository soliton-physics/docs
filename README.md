<p align="center">
  <img src="https://raw.githubusercontent.com/soliton-physics/.github/main/logo/soliton.svg" width="120" alt="Soliton Physics">
</p>

<h1 align="center">docs</h1>

<p align="center">Documentation for Soliton Physics. Intuition, mathematics and numerics side by side, with live simulations.</p>

Live at [soliton-docs.vercel.app](https://soliton-docs.vercel.app/).

## Structure

- `start/` orientation and installation
- `physics/` one page per equation, each in three layers: intuition, mathematics, numerics with validation
- `numerics/` the methods themselves
- `reference/` Rust, Python and JavaScript APIs

Live simulations are embedded from the [playground](https://github.com/soliton-physics/playground) with the `LiveSim` component.

## Development

```sh
pnpm install
pnpm dev
```

Built with [Astro Starlight](https://starlight.astro.build) and KaTeX. Deployed on Vercel from `main`.
Set `PUBLIC_PLAYGROUND_URL` and `PUBLIC_SITE_URL` in the project settings if the defaults in `.env` do not match your domains.

## License

MIT
