# How to contribute

## Running the site locally

1. Clone the repo.

2. Run `bundle exec jekyll serve` from the root directory.

3. Browse `localhost:4000`.

## Automated deployment

Upon each change in the repo, a GitHub Pages job is initiated, taking care of building and deploying the site.

## Posting news

News are stored in the [/_posts](https://github.com/geodes-sms/geodes-sms.github.io/tree/main/_posts) with every post in its own .md file. The name of the file is shown in the URL. The header section contains metadata used by the website to render the news. In particular, the following elements have to be changed whenever a post is made:

* `title`
* `date` - we use the GMT-5 offset
* `categories` - free text, no specific rules for now

In the body, you can use `<!--more-->` to separate the excerpt (shown in the newsfeed) from the rest of the text.

## Adding data

Data is stored in the [/_data](https://github.com/geodes-sms/geodes-sms.github.io/tree/main/_data) folder in yml and csv files. Jekyll pages can use data as ```site.data.[subfolders]*.[filename]```. This example shows a simple counting of the active members on the landing page: https://raw.githubusercontent.com/geodes-sms/geodes-sms.github.io/main/index.md.

## Adding images
Data is stored in the [/images](https://github.com/geodes-sms/geodes-sms.github.io/tree/main/images) folder. Jekyll pages can use images via simple hyperlinking.


# Helpful resources

- [Jekyll data files](https://jekyllrb.com/docs/datafiles/)
- [Liquid filters](https://shopify.github.io/liquid/)
