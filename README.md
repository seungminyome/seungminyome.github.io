# seungminyome.github.io

Source of my personal academic website, [seungminyome.github.io](https://seungminyome.github.io): research projects, CV, publications and literature notes.

Built with [Jekyll](https://jekyllrb.com/) and the [al-folio](https://github.com/alshedivat/al-folio) theme. Pushes to `main` are built and deployed to GitHub Pages by `.github/workflows/deploy.yml`; the CV page is rendered from `_data/cv.yml` by [RenderCV](https://github.com/rendercv/rendercv) in `.github/workflows/render-cv.yml`.

## Where things live

| Path | Content |
|---|---|
| `_pages/about.md` | Front page |
| `_pages/research.md` | Research statement |
| `_projects/` | One page per research project |
| `_posts/` | Literature notes and research agenda posts |
| `_bibliography/papers.bib` | Publications |
| `_data/cv.yml` | CV source (rendered to PDF by RenderCV) |
| `_config.yml` | Site configuration |

## Local preview

With Docker:

```bash
docker compose up
```

then open <http://localhost:8080>. Or with Ruby:

```bash
bundle install
bundle exec jekyll serve
```

## License

The theme is MIT-licensed ([LICENSE](LICENSE)). Text and figures of the site are © Seungmin Yome.
