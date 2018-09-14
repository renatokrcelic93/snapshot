const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const geolocate = require("./services/geolocate");
const LRUCache = require("lru-cache");
require("dotenv").config();
const oldItems = require("./config/oldItems");

const verifyJWT = token => {
  return new Promise(resolve => {
    resolve(jwt.verify(token, "secret account key"));
  });
};

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

// const dev = true
const dev = process.env.NODE_ENV === "development";
const app = next({ dev });
const handle = app.getRequestHandler();

const isLoggedIn = async (req, res, next) => {
  try {
    await verifyJWT(req.cookies["token"]);
    return res.redirect("/profile");
  } catch (err) {
    next();
    return;
  }
};

const isNotLoggedIn = async (req, res, next) => {
  try {
    await verifyJWT(req.cookies["token"]);
    next();
    return;
  } catch (err) {
    return res.redirect("/");
  }
};

const checkIfOldItem = endpoint => async (req, res, next) => {
  if (oldItems[req.params.slug]) {
    const slug = oldItems[req.params.slug];
    return res.redirect(301, `/${endpoint}/${slug}`);
  }
  return next();
};

const geolocationMiddleware = async (req, res, next) => {
  const ip = "80.98.115.117";
  try {
    res.geolocation = await geolocate(ip);
    // res.geolocation = await geolocate(req.connection.remoteAddress)
    next();
  } catch (e) {
    console.log("error", e);
    next();
  }
  return;
};

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());

    server.get("/", isLoggedIn, (req, res) => {
      const actualPage = "/";
      return app.render(req, res, actualPage);
    });
    server.get(
      "/explore/:slug",
      geolocationMiddleware,
      isLoggedIn,
      (req, res) => {
        const actualPage = "/explorePage";
        const query = { slug: req.params.slug };
        return app.render(req, res, actualPage, query);
      }
    );
    server.get(
      "/campaign/:slug",
      checkIfOldItem("campaign"),
      isLoggedIn,
      (req, res) => {
        const actualPage = "/campaignPage";
        const query = { slug: req.params.slug };
        return app.render(req, res, actualPage, query);
      }
    );
    server.get(
      "/project/:slug",
      checkIfOldItem("project"),
      isLoggedIn,
      (req, res) => {
        const actualPage = "/projectPage";
        const query = { slug: req.params.slug };
        return app.render(req, res, actualPage, query);
      }
    );
    server.get("/org/:slug", checkIfOldItem("org"), isLoggedIn, (req, res) => {
      const actualPage = "/organizationPage";
      const query = { slug: req.params.slug };
      return app.render(req, res, actualPage, query);
    });
    server.get("/hub", isLoggedIn, geolocationMiddleware, (req, res) => {
      const actualPage = "/hubPage";
      return app.render(req, res, actualPage);
    });
    server.get("/search", isLoggedIn, (req, res) => {
      const actualPage = "/searchPage";
      return app.render(req, res, actualPage);
    });
    server.get("/user", isLoggedIn, (req, res) => {
      const actualPage = "/userPage";
      // const query = { id: req.params.id }
      return app.render(req, res, actualPage);
    });
    server.get("/settings", isLoggedIn, (req, res) => {
      const actualPage = "/userSettingsPage";
      // const query = { id: req.params.id }
      return app.render(req, res, actualPage);
    });
    server.get("/notifications", isLoggedIn, (req, res) => {
      const actualPage = "/userNotificationsPage";
      return app.render(req, res, actualPage);
    });
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(process.env.PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`;
}

async function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req);

  if (!dev) {
    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key)) {
      res.setHeader("x-cache", "HIT");
      res.send(ssrCache.get(key));
      return;
    }
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    if (!dev) {
      ssrCache.set(key, html);
    }
    // Let's cache this page

    res.setHeader("x-cache", "MISS");
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}
