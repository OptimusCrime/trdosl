CREATE TABLE entry
(
    id           INTEGER PRIMARY KEY,
    type         TEXT  NOT NULL,
    run_date     DATETIME NOT NULL,
    run_distance INT         NOT NULL,
    run_time     TEXT        NOT NULL,
    comment      TEXT,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
)