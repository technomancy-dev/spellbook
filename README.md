# Spellbook Basics

Spellbook is an extemely opinionated Astro starter kit.

It comes with a dashboard that is a Single Page App powered by TanStack Router.

Github App setup.

Homepage URL: `http://localhost:4321/`
Callback URL: `http://localhost:8080/api/oauth2-redirect`


Build & Run the Pocketbase docker image from the pocketbase.Dockerfile.

```sh
docker build -t spellbook-pocketbase -f pocketbase.Dockerfile .
```

```sh
docker run -d \
  -p 8080:8080 \
  -v "$(pwd)/pb_data:/pb/pb_data" \
  spellbook-pocketbase
```


## Why a SPA?

When I first started my career the new hotness was making Single Page Apps.

As a new programmer I was able to build incredibly powerfull apps by using React and React Router.

As time went on Next.js came out, and like most of the industry I bet big on the people behind it.

With each release things got more complex and obtuse but I had confidence that the Vercel (then Zeit)
team knew best.

Now though, with 10 years of building for the web I reflect on the early days and to me it is plainly clear we
as an industry have made a mistake.

Single Page Apps are significantly easier to make than the BFF stacks that have gained popularity, and SPA's
often result in a better user experience.

I think this will continue to be the case, and with Local First and syncing engines like Zero I think the user
experience will become significantly better for apps that embrace this ideology.
