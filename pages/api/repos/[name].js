import getRepository from "server/redis";

async function findInCache(name) {
  const repository = await getRepository();
  return repository.search().where("login").equals(name).return.first();
}

async function storeInCache(data) {
  const repository = await getRepository();

  let repo = repository.createEntity();
  repo.login = data.login;
  repo.url = data.url;
  repo.avatar_url = data.avatar_url;
  repo.type = data.type;
  repo.public_repos = data.public_repos;
  repo.followers = data.followers;
  repo.following = data.following;
  repo.time = data.time;

  await repository.save(repo);

  return repo;
}

export async function getGitRepo(name) {
  const start = Date.now();
  const repo = await findInCache(name);

  if (repo) {
    return {
      repo: repo.toJSON(),
      cached: true,
      time: Date.now() - start,
    };
  }

  const url = `https://api.github.com/users/${name}`;

  const response = await fetch(url);
  let data = await response.json();

  if (!!data) {
    data.time = Date.now() - start;
    data = await storeInCache(data);
  }

  return {
    repo: data,
    cached: false,
    time: data.time,
  };
}

export default async function handler(req, res) {
  res.send(await getGitRepo(req.query.name));
}
