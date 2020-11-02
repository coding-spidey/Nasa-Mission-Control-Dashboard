FROM hayd/deno:alpine-1.5.0

WORKDIR /app

# Prefer not to run as root.
USER deno

# These steps will be re-run upon each file change in your working directory:
COPY . .

CMD ["run", "--allow-net", "--allow-read", "src/mod.ts"]


EXPOSE 8000