# Paige's Blog proof of concept

This prototype tests whether a non-technical author can write and manage posts in a friendly browser editor while Angular publishes a completely static blog. There is no production server or database.

## How it fits together

1. Decap CMS edits Markdown files and uploads images.
2. Publishing commits those changes to this GitHub repository.
3. The Angular build converts the Markdown into typed blog data.
4. Angular prerenders the homepage, listing, and every post as static HTML.
5. GitHub Pages will eventually serve that static output.

The Pages deployment workflow is intentionally deferred until the POC and its final URL/base path have been tested. Pull requests already run the unit tests and production build in GitHub Actions.

## Run the public site locally

Requirements: Node.js 24 and npm.

```sh
npm ci
npm start
```

Visit <http://localhost:4200>. The pre-start step automatically rebuilds the blog data. Restart the development server after editing a Markdown file directly.

## Run the editor locally

Keep the public site running. In a second terminal, run:

```sh
npm run cms
```

Then visit <http://localhost:4200/admin/>. Choose **Work with local repository**. Local mode writes straight to the working copy; it does not require a GitHub login and is only available while the local Decap server is running.

After publishing a local edit, restart `npm start` so the content-generation step sees it. The local editor is a workflow preview; the hosted version will commit through GitHub and trigger a fresh build automatically.

## Content and images

Posts live in `content/posts`. Their filenames become their URL slugs, but the author does not need to manage this: Decap generates a filename from the title. Uploaded images go to `public/images/uploads` and are copied into the static site unchanged.

The editor presents only these fields:

- Title
- Short description
- Publish date
- Featured image (optional; an understated placeholder is used when omitted)
- Category
- Rich-text post content

Run `npm run content:build` to validate and regenerate `src/app/generated/posts.ts`. That generated file should not be edited manually.

## Tests and static build

```sh
npm test
npm run build
```

The static site is written to `dist/paige-blog/browser`. A pull request to GitHub automatically runs both commands through `.github/workflows/pull-request.yml`.

## Hosted Decap and GitHub setup still required

The checked-in CMS configuration points at `Ere-Mia/paige-blog` on the `main` branch and contains no secrets. Before testing hosted publishing:

1. Choose an authentication service compatible with Decap's GitHub backend. GitHub Pages cannot safely hold an OAuth client secret, so this requires a small external authentication service (or a service such as Netlify that provides Git Gateway).
2. Create the GitHub OAuth application and configure its callback URL exactly as required by that service.
3. Store the OAuth client secret only in the authentication service's secret settings—not in this repository or frontend.
4. Add the service's public `base_url` and, if required, `auth_endpoint` to `public/admin/config.yml`.
5. Add the eventual author as a repository collaborator with the minimum GitHub access needed to write posts. Enable two-factor authentication and never share an account or personal access token.
6. Once the final Pages URL is agreed, add the Pages deployment workflow with the matching Angular base path and enable GitHub Pages with **GitHub Actions** as its source.

Publishing in the hosted editor will then create a Git commit. That commit triggers the eventual Pages build, and the static site updates when the deployment finishes.

## Testing with the blog author

Do not teach the workflow during the test unless she becomes completely blocked. Observe where she pauses, misreads a label, or asks for help.

Ask her to sign in, create a post, enter a title and description, write several paragraphs, add a heading and formatting, upload a featured image, insert an image in the article, and publish. After the deployment, ask her to find the post on the public site. Then ask her to return to the editor, find that post, correct a typo, publish the edit, and confirm the updated public version.

## Known prototype limitations

- Hosted login and deployment are not active yet.
- The browser preview inside Decap is disabled; the public site is the accurate preview.
- Local edits require restarting the Angular development server.
- Images are optional and are not resized or optimised.
- Categories are a small fixed list that currently requires a developer to change.
- The CMS script is loaded from a public CDN at `/admin/`; pinning and self-hosting can be considered after the POC.
- Git-backed publishing has a delay while GitHub Actions rebuilds the site.
- Decap's GitHub authentication and Git concepts can surface in error messages. This is an important point to watch during author testing.
