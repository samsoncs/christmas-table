CREATE TABLE contestant(
    id uuid PRIMARY KEY,
    user_name varchar(20),
    FOREIGN KEY (id) REFERENCES auth.users(id)
);

alter table contestant enable row level security;

create policy "Authenticated can read from contestant"
on contestant for select
to authenticated
using ( true );

CREATE TABLE leaderboard(
 id uuid PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
 user_id uuid not null unique,
 score int,
 FOREIGN KEY (user_id) REFERENCES contestant(id)
);

alter table leaderboard enable row level security;

create policy "Authenticated can read from leaderboard"
on leaderboard for select
to authenticated
using ( true );

CREATE TABLE score(
    id bigint PRIMARY KEY NOT NULL,
    "name" varchar(20),
    results jsonb
);

alter table score enable row level security;

create policy "Authenticated can read from score"
on score for select
to authenticated
using ( true );

create policy "Admin can update score"
on score for update
to authenticated
using ( (select auth.uid()) = '66efe21d-7bf8-4425-915b-8000a7b10840' );

create policy "Admin can insert score"
on score for insert
to authenticated
with check( (select auth.uid()) = '66efe21d-7bf8-4425-915b-8000a7b10840' );

CREATE OR REPLACE FUNCTION add_score(score_id integer, score_name varchar(20), results jsonb)
RETURNS void
AS
$$
--DECLARE 
	--i int = 1;
	--curr_team int;
    --curr_token varchar(50);
    --curr_token_team_id int;
    --number_of_teams int;
	--points int;
BEGIN
    IF auth.uid() != '66efe21d-7bf8-4425-915b-8000a7b10840' THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    INSERT INTO score(id, "name", results)
    VALUES(score_id, score_name, results)
    ON CONFLICT(id) DO UPDATE SET score_name = EXCLUDED.score_name, results = EXCLUDED.results;

END;
$$
LANGUAGE plpgsql;