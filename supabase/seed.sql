-- Clean up
delete from leaderboard;
delete from score;

CREATE OR REPLACE FUNCTION create_user(user_id uuid, user_name varchar(50), pwd varchar(20)) 
RETURNS void
AS
$$
BEGIN
    INSERT INTO auth.users (
      id,
      instance_id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      invited_at,
      confirmation_token,
      confirmation_sent_at,
      recovery_token,
      recovery_sent_at,
      email_change_token_new,
      email_change,
      email_change_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at,
      phone,
      phone_confirmed_at,
      phone_change,
      phone_change_token,
      phone_change_sent_at,
      email_change_token_current,
      email_change_confirm_status,
      banned_until,
      reauthentication_token,
      reauthentication_sent_at
    )
    values(
        user_id,
        '00000000-0000-0000-0000-000000000000'::uuid,
        'authenticated',
        'authenticated',
        user_name,
        crypt(pwd, gen_salt('bf')),
        now(),
        NULL::timestamp,
        '',
        NULL::timestamp,
        '',
        NULL::timestamp,
        '',
        '',
        NULL::timestamp,
        now()::timestamp,
        '{"provider":"email","providers":["email"]}'::jsonb,
        '{}'::jsonb,
        0::boolean,
        '2022-10-04 03:41:27.391146+00'::timestamp,
        '2022-10-04 03:41:27.391146+00'::timestamp,
        NULL,
        NULL::timestamp,
        '',
        '',
        NULL::timestamp,
        '',
        0,
        NULL::timestamp,
        '',
        NULL::timestamp
    );

    INSERT INTO contestant(id, user_name) 
    VALUES(user_id, user_name);
END;
$$
LANGUAGE plpgsql;

do $$
begin
    PERFORM create_user('66efe21d-7bf8-4425-915b-8000a7b10840', 'samson', 's4msp4ssord');
    PERFORM create_user('66efe21d-7bf8-4425-915b-8000a7b10841', 'eivind', 'test');
    PERFORM create_user('66efe21d-7bf8-4425-915b-8000a7b10842', 'malte', 'test');
    PERFORM create_user('66efe21d-7bf8-4425-915b-8000a7b10843', 'martin', 'test');
    PERFORM create_user('66efe21d-7bf8-4425-915b-8000a7b10844', 'henrik', 'test');
end$$;

DROP FUNCTION create_user;

INSERT INTO leaderboard(user_id, score)
VALUES
('66efe21d-7bf8-4425-915b-8000a7b10840', 10),
('66efe21d-7bf8-4425-915b-8000a7b10841', 7),
('66efe21d-7bf8-4425-915b-8000a7b10842', 16),
('66efe21d-7bf8-4425-915b-8000a7b10843', 2),
('66efe21d-7bf8-4425-915b-8000a7b10844', 2);