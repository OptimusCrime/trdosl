CREATE TABLE entry
(
    id           SERIAL PRIMARY KEY,
    type         ENTRY_TYPE  NOT NULL,
    run_date     TIMESTAMPTZ NOT NULL,
    run_distance INT         NOT NULL,
    run_time     TEXT        NOT NULL,
    comment      TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
)