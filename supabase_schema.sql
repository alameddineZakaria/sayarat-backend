--
-- PostgreSQL database dump
--

\restrict E6uoXkNjrcc99r5nAfgnM1QSuJDx7O0xVbflwTn4ueNP1pSoUu8UPNSqAox60wE

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7 (Ubuntu 17.7-3.pgdg24.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


ALTER TYPE auth.oauth_authorization_status OWNER TO supabase_auth_admin;

--
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


ALTER TYPE auth.oauth_client_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


ALTER TYPE auth.oauth_response_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS',
    'VECTOR'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $_$
  BEGIN
      RAISE DEBUG 'PgBouncer auth request: %', p_usename;

      RETURN QUERY
      SELECT
          rolname::text,
          CASE WHEN rolvaliduntil < now()
              THEN null
              ELSE rolpassword::text
          END
      FROM pg_authid
      WHERE rolname=$1 and rolcanlogin;
  END;
  $_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: check_listing_limit(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_listing_limit(check_user_id uuid) RETURNS TABLE(current_count integer, max_allowed integer, can_create boolean)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    user_plan TEXT;
    listing_count INTEGER;
    max_listings INTEGER;
BEGIN
    -- Get user's subscription plan
    SELECT plan_type INTO user_plan
    FROM subscriptions
    WHERE user_id = check_user_id
    AND status IN ('active', 'trialing')
    ORDER BY created_at DESC
    LIMIT 1;
    
    -- Count current active listings
    SELECT COUNT(*) INTO listing_count
    FROM vehicles
    WHERE user_id = check_user_id
    AND status = 'active';
    
    -- Determine max listings based on plan
    max_listings := CASE 
        WHEN user_plan = 'dealer' THEN 1000
        WHEN user_plan = 'pro' THEN 50
        WHEN user_plan = 'basic' THEN 10
        ELSE 3  -- Free tier
    END;
    
    RETURN QUERY SELECT listing_count, max_listings, listing_count < max_listings;
END;
$$;


ALTER FUNCTION public.check_listing_limit(check_user_id uuid) OWNER TO postgres;

--
-- Name: cleanup_expired_search_cache(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.cleanup_expired_search_cache() RETURNS integer
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM search_cache WHERE expires_at < NOW();
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;


ALTER FUNCTION public.cleanup_expired_search_cache() OWNER TO postgres;

--
-- Name: get_user_subscription(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_user_subscription(check_user_id uuid) RETURNS TABLE(subscription_id uuid, plan_type text, status text, expires_at timestamp with time zone)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    RETURN QUERY
    SELECT s.id, s.plan_type, s.status, s.current_period_end
    FROM subscriptions s
    WHERE s.user_id = check_user_id
    AND s.status IN ('active', 'trialing')
    ORDER BY s.created_at DESC
    LIMIT 1;
END;
$$;


ALTER FUNCTION public.get_user_subscription(check_user_id uuid) OWNER TO postgres;

--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
  );
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.handle_new_user() OWNER TO postgres;

--
-- Name: increment_favorites_count(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.increment_favorites_count() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE vehicles SET favorites_count = favorites_count + 1 WHERE id = NEW.listing_id;
        UPDATE listings SET favorites_count = COALESCE(favorites_count, 0) + 1 WHERE id = NEW.listing_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE vehicles SET favorites_count = GREATEST(favorites_count - 1, 0) WHERE id = OLD.listing_id;
        UPDATE listings SET favorites_count = GREATEST(COALESCE(favorites_count, 0) - 1, 0) WHERE id = OLD.listing_id;
    END IF;
    RETURN NULL;
END;
$$;


ALTER FUNCTION public.increment_favorites_count() OWNER TO postgres;

--
-- Name: increment_vehicle_views(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.increment_vehicle_views(vehicle_uuid uuid) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    UPDATE vehicles 
    SET views_count = views_count + 1 
    WHERE id = vehicle_uuid;
END;
$$;


ALTER FUNCTION public.increment_vehicle_views(vehicle_uuid uuid) OWNER TO postgres;

--
-- Name: invalidate_search_cache(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.invalidate_search_cache() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  -- Delete all cached search results when a vehicle is modified
  -- This is a simple approach; for production, you might want more targeted invalidation
  DELETE FROM search_cache WHERE expires_at > NOW();
  RETURN COALESCE(NEW, OLD);
END;
$$;


ALTER FUNCTION public.invalidate_search_cache() OWNER TO postgres;

--
-- Name: is_admin(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.is_admin(user_id uuid) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.user_id = $1 
    AND is_active = TRUE
  );
END;
$_$;


ALTER FUNCTION public.is_admin(user_id uuid) OWNER TO postgres;

--
-- Name: is_user_banned(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.is_user_banned(check_user_id uuid) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_bans 
        WHERE user_id = check_user_id 
        AND is_active = true 
        AND (expires_at IS NULL OR expires_at > NOW())
    );
END;
$$;


ALTER FUNCTION public.is_user_banned(check_user_id uuid) OWNER TO postgres;

--
-- Name: notify_saved_search_matches(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.notify_saved_search_matches() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  response_status INT;
  response_body TEXT;
BEGIN
  -- Only trigger for new active vehicles
  IF NEW.status = 'active' THEN
    -- Use pg_net extension to call the edge function asynchronously
    -- Note: This requires the pg_net extension to be enabled
    -- If pg_net is not available, this will be a no-op
    BEGIN
      PERFORM net.http_post(
        url := current_setting('app.supabase_url', true) || '/functions/v1/saved-search-matcher',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key', true)
        ),
        body := jsonb_build_object(
          'vehicleId', NEW.id,
          'vehicle', row_to_json(NEW)
        )
      );
    EXCEPTION WHEN OTHERS THEN
      -- Log the error but don't fail the insert
      RAISE NOTICE 'Failed to call saved-search-matcher: %', SQLERRM;
    END;
  END IF;
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.notify_saved_search_matches() OWNER TO postgres;

--
-- Name: notify_saved_search_matches_on_update(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.notify_saved_search_matches_on_update() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  -- Only trigger when status changes to active
  IF NEW.status = 'active' AND (OLD.status IS NULL OR OLD.status != 'active') THEN
    BEGIN
      PERFORM net.http_post(
        url := current_setting('app.supabase_url', true) || '/functions/v1/saved-search-matcher',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key', true)
        ),
        body := jsonb_build_object(
          'vehicleId', NEW.id,
          'vehicle', row_to_json(NEW)
        )
      );
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Failed to call saved-search-matcher: %', SQLERRM;
    END;
  END IF;
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.notify_saved_search_matches_on_update() OWNER TO postgres;

--
-- Name: owns_listing(uuid, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.owns_listing(user_id uuid, listing_id uuid) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM listings 
    WHERE listings.id = $2 
    AND listings.user_id = $1
  );
END;
$_$;


ALTER FUNCTION public.owns_listing(user_id uuid, listing_id uuid) OWNER TO postgres;

--
-- Name: owns_vehicle(uuid, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.owns_vehicle(user_id uuid, vehicle_id uuid) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM vehicles 
    WHERE vehicles.id = $2 
    AND vehicles.user_id = $1
  );
END;
$_$;


ALTER FUNCTION public.owns_vehicle(user_id uuid, vehicle_id uuid) OWNER TO postgres;

--
-- Name: update_promo_usage_count(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_promo_usage_count() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    UPDATE promo_codes 
    SET usage_count = usage_count + 1 
    WHERE id = NEW.promo_code_id;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_promo_usage_count() OWNER TO postgres;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;

--
-- Name: update_vehicle_search_vector(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_vehicle_search_vector() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  features_text TEXT := '';
BEGIN
  -- Handle features as JSONB array
  IF NEW.features IS NOT NULL AND jsonb_typeof(NEW.features) = 'array' THEN
    SELECT string_agg(elem::text, ' ') INTO features_text
    FROM jsonb_array_elements_text(NEW.features) AS elem;
  END IF;
  
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.make, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.model, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.body_type, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.location, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.city, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(features_text, '')), 'C');
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_vehicle_search_vector() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
  final_payload jsonb;
BEGIN
  BEGIN
    -- Generate a new UUID for the id
    generated_id := gen_random_uuid();

    -- Check if payload has an 'id' key, if not, add the generated UUID
    IF payload ? 'id' THEN
      final_payload := payload;
    ELSE
      final_payload := jsonb_set(payload, '{id}', to_jsonb(generated_id));
    END IF;

    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (id, payload, event, topic, private, extension)
    VALUES (generated_id, final_payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: add_prefixes(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.add_prefixes(_bucket_id text, _name text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    prefixes text[];
BEGIN
    prefixes := "storage"."get_prefixes"("_name");

    IF array_length(prefixes, 1) > 0 THEN
        INSERT INTO storage.prefixes (name, bucket_id)
        SELECT UNNEST(prefixes) as name, "_bucket_id" ON CONFLICT DO NOTHING;
    END IF;
END;
$$;


ALTER FUNCTION storage.add_prefixes(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: delete_leaf_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_rows_deleted integer;
BEGIN
    LOOP
        WITH candidates AS (
            SELECT DISTINCT
                t.bucket_id,
                unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        ),
        uniq AS (
             SELECT
                 bucket_id,
                 name,
                 storage.get_level(name) AS level
             FROM candidates
             WHERE name <> ''
             GROUP BY bucket_id, name
        ),
        leaf AS (
             SELECT
                 p.bucket_id,
                 p.name,
                 p.level
             FROM storage.prefixes AS p
                  JOIN uniq AS u
                       ON u.bucket_id = p.bucket_id
                           AND u.name = p.name
                           AND u.level = p.level
             WHERE NOT EXISTS (
                 SELECT 1
                 FROM storage.objects AS o
                 WHERE o.bucket_id = p.bucket_id
                   AND o.level = p.level + 1
                   AND o.name COLLATE "C" LIKE p.name || '/%'
             )
             AND NOT EXISTS (
                 SELECT 1
                 FROM storage.prefixes AS c
                 WHERE c.bucket_id = p.bucket_id
                   AND c.level = p.level + 1
                   AND c.name COLLATE "C" LIKE p.name || '/%'
             )
        )
        DELETE
        FROM storage.prefixes AS p
            USING leaf AS l
        WHERE p.bucket_id = l.bucket_id
          AND p.name = l.name
          AND p.level = l.level;

        GET DIAGNOSTICS v_rows_deleted = ROW_COUNT;
        EXIT WHEN v_rows_deleted = 0;
    END LOOP;
END;
$$;


ALTER FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix(_bucket_id text, _name text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    -- Check if we can delete the prefix
    IF EXISTS(
        SELECT FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name") + 1
          AND "prefixes"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    )
    OR EXISTS(
        SELECT FROM "storage"."objects"
        WHERE "objects"."bucket_id" = "_bucket_id"
          AND "storage"."get_level"("objects"."name") = "storage"."get_level"("_name") + 1
          AND "objects"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    ) THEN
    -- There are sub-objects, skip deletion
    RETURN false;
    ELSE
        DELETE FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name")
          AND "prefixes"."name" = "_name";
        RETURN true;
    END IF;
END;
$$;


ALTER FUNCTION storage.delete_prefix(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix_hierarchy_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix_hierarchy_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    prefix text;
BEGIN
    prefix := "storage"."get_prefix"(OLD."name");

    IF coalesce(prefix, '') != '' THEN
        PERFORM "storage"."delete_prefix"(OLD."bucket_id", prefix);
    END IF;

    RETURN OLD;
END;
$$;


ALTER FUNCTION storage.delete_prefix_hierarchy_trigger() OWNER TO supabase_storage_admin;

--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    SELECT string_to_array(name, '/') INTO _parts;
    SELECT _parts[array_length(_parts,1)] INTO _filename;
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_level(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_level(name text) RETURNS integer
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
SELECT array_length(string_to_array("name", '/'), 1);
$$;


ALTER FUNCTION storage.get_level(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefix(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefix(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
SELECT
    CASE WHEN strpos("name", '/') > 0 THEN
             regexp_replace("name", '[\/]{1}[^\/]+\/?$', '')
         ELSE
             ''
        END;
$_$;


ALTER FUNCTION storage.get_prefix(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefixes(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefixes(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
    parts text[];
    prefixes text[];
    prefix text;
BEGIN
    -- Split the name into parts by '/'
    parts := string_to_array("name", '/');
    prefixes := '{}';

    -- Construct the prefixes, stopping one level below the last part
    FOR i IN 1..array_length(parts, 1) - 1 LOOP
            prefix := array_to_string(parts[1:i], '/');
            prefixes := array_append(prefixes, prefix);
    END LOOP;

    RETURN prefixes;
END;
$$;


ALTER FUNCTION storage.get_prefixes(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: lock_top_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket text;
    v_top text;
BEGIN
    FOR v_bucket, v_top IN
        SELECT DISTINCT t.bucket_id,
            split_part(t.name, '/', 1) AS top
        FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        WHERE t.name <> ''
        ORDER BY 1, 2
        LOOP
            PERFORM pg_advisory_xact_lock(hashtextextended(v_bucket || '/' || v_top, 0));
        END LOOP;
END;
$$;


ALTER FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- Name: objects_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: objects_insert_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_insert_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    NEW.level := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_insert_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    -- NEW - OLD (destinations to create prefixes for)
    v_add_bucket_ids text[];
    v_add_names      text[];

    -- OLD - NEW (sources to prune)
    v_src_bucket_ids text[];
    v_src_names      text[];
BEGIN
    IF TG_OP <> 'UPDATE' THEN
        RETURN NULL;
    END IF;

    -- 1) Compute NEW−OLD (added paths) and OLD−NEW (moved-away paths)
    WITH added AS (
        SELECT n.bucket_id, n.name
        FROM new_rows n
        WHERE n.name <> '' AND position('/' in n.name) > 0
        EXCEPT
        SELECT o.bucket_id, o.name FROM old_rows o WHERE o.name <> ''
    ),
    moved AS (
         SELECT o.bucket_id, o.name
         FROM old_rows o
         WHERE o.name <> ''
         EXCEPT
         SELECT n.bucket_id, n.name FROM new_rows n WHERE n.name <> ''
    )
    SELECT
        -- arrays for ADDED (dest) in stable order
        COALESCE( (SELECT array_agg(a.bucket_id ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        COALESCE( (SELECT array_agg(a.name      ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        -- arrays for MOVED (src) in stable order
        COALESCE( (SELECT array_agg(m.bucket_id ORDER BY m.bucket_id, m.name) FROM moved m), '{}' ),
        COALESCE( (SELECT array_agg(m.name      ORDER BY m.bucket_id, m.name) FROM moved m), '{}' )
    INTO v_add_bucket_ids, v_add_names, v_src_bucket_ids, v_src_names;

    -- Nothing to do?
    IF (array_length(v_add_bucket_ids, 1) IS NULL) AND (array_length(v_src_bucket_ids, 1) IS NULL) THEN
        RETURN NULL;
    END IF;

    -- 2) Take per-(bucket, top) locks: ALL prefixes in consistent global order to prevent deadlocks
    DECLARE
        v_all_bucket_ids text[];
        v_all_names text[];
    BEGIN
        -- Combine source and destination arrays for consistent lock ordering
        v_all_bucket_ids := COALESCE(v_src_bucket_ids, '{}') || COALESCE(v_add_bucket_ids, '{}');
        v_all_names := COALESCE(v_src_names, '{}') || COALESCE(v_add_names, '{}');

        -- Single lock call ensures consistent global ordering across all transactions
        IF array_length(v_all_bucket_ids, 1) IS NOT NULL THEN
            PERFORM storage.lock_top_prefixes(v_all_bucket_ids, v_all_names);
        END IF;
    END;

    -- 3) Create destination prefixes (NEW−OLD) BEFORE pruning sources
    IF array_length(v_add_bucket_ids, 1) IS NOT NULL THEN
        WITH candidates AS (
            SELECT DISTINCT t.bucket_id, unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(v_add_bucket_ids, v_add_names) AS t(bucket_id, name)
            WHERE name <> ''
        )
        INSERT INTO storage.prefixes (bucket_id, name)
        SELECT c.bucket_id, c.name
        FROM candidates c
        ON CONFLICT DO NOTHING;
    END IF;

    -- 4) Prune source prefixes bottom-up for OLD−NEW
    IF array_length(v_src_bucket_ids, 1) IS NOT NULL THEN
        -- re-entrancy guard so DELETE on prefixes won't recurse
        IF current_setting('storage.gc.prefixes', true) <> '1' THEN
            PERFORM set_config('storage.gc.prefixes', '1', true);
        END IF;

        PERFORM storage.delete_leaf_prefixes(v_src_bucket_ids, v_src_names);
    END IF;

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_update_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_level_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_level_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Set the new level
        NEW."level" := "storage"."get_level"(NEW."name");
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_level_trigger() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    old_prefixes TEXT[];
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Retrieve old prefixes
        old_prefixes := "storage"."get_prefixes"(OLD."name");

        -- Remove old prefixes that are only used by this object
        WITH all_prefixes as (
            SELECT unnest(old_prefixes) as prefix
        ),
        can_delete_prefixes as (
             SELECT prefix
             FROM all_prefixes
             WHERE NOT EXISTS (
                 SELECT 1 FROM "storage"."objects"
                 WHERE "bucket_id" = OLD."bucket_id"
                   AND "name" <> OLD."name"
                   AND "name" LIKE (prefix || '%')
             )
         )
        DELETE FROM "storage"."prefixes" WHERE name IN (SELECT prefix FROM can_delete_prefixes);

        -- Add new prefixes
        PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    END IF;
    -- Set the new level
    NEW."level" := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: prefixes_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.prefixes_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: prefixes_insert_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_insert_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.prefixes_insert_trigger() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql
    AS $$
declare
    can_bypass_rls BOOLEAN;
begin
    SELECT rolbypassrls
    INTO can_bypass_rls
    FROM pg_roles
    WHERE rolname = coalesce(nullif(current_setting('role', true), 'none'), current_user);

    IF can_bypass_rls THEN
        RETURN QUERY SELECT * FROM storage.search_v1_optimised(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    ELSE
        RETURN QUERY SELECT * FROM storage.search_legacy_v1(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    END IF;
end;
$$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_legacy_v1(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select path_tokens[$1] as folder
           from storage.objects
             where objects.name ilike $2 || $3 || ''%''
               and bucket_id = $4
               and array_length(objects.path_tokens, 1) <> $1
           group by folder
           order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v1_optimised(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select (string_to_array(name, ''/''))[level] as name
           from storage.prefixes
             where lower(prefixes.name) like lower($2 || $3) || ''%''
               and bucket_id = $4
               and level = $1
           order by name ' || v_sort_order || '
     )
     (select name,
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[level] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where lower(objects.name) like lower($2 || $3) || ''%''
       and bucket_id = $4
       and level = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    sort_col text;
    sort_ord text;
    cursor_op text;
    cursor_expr text;
    sort_expr text;
BEGIN
    -- Validate sort_order
    sort_ord := lower(sort_order);
    IF sort_ord NOT IN ('asc', 'desc') THEN
        sort_ord := 'asc';
    END IF;

    -- Determine cursor comparison operator
    IF sort_ord = 'asc' THEN
        cursor_op := '>';
    ELSE
        cursor_op := '<';
    END IF;
    
    sort_col := lower(sort_column);
    -- Validate sort column  
    IF sort_col IN ('updated_at', 'created_at') THEN
        cursor_expr := format(
            '($5 = '''' OR ROW(date_trunc(''milliseconds'', %I), name COLLATE "C") %s ROW(COALESCE(NULLIF($6, '''')::timestamptz, ''epoch''::timestamptz), $5))',
            sort_col, cursor_op
        );
        sort_expr := format(
            'COALESCE(date_trunc(''milliseconds'', %I), ''epoch''::timestamptz) %s, name COLLATE "C" %s',
            sort_col, sort_ord, sort_ord
        );
    ELSE
        cursor_expr := format('($5 = '''' OR name COLLATE "C" %s $5)', cursor_op);
        sort_expr := format('name COLLATE "C" %s', sort_ord);
    END IF;

    RETURN QUERY EXECUTE format(
        $sql$
        SELECT * FROM (
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    NULL::uuid AS id,
                    updated_at,
                    created_at,
                    NULL::timestamptz AS last_accessed_at,
                    NULL::jsonb AS metadata
                FROM storage.prefixes
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
            UNION ALL
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    id,
                    updated_at,
                    created_at,
                    last_accessed_at,
                    metadata
                FROM storage.objects
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
        ) obj
        ORDER BY %s
        LIMIT $3
        $sql$,
        cursor_expr,    -- prefixes WHERE
        sort_expr,      -- prefixes ORDER BY
        cursor_expr,    -- objects WHERE
        sort_expr,      -- objects ORDER BY
        sort_expr       -- final ORDER BY
    )
    USING prefix, bucket_name, limits, levels, start_after, sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid,
    last_webauthn_challenge_data jsonb
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: COLUMN mfa_factors.last_webauthn_challenge_data; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.mfa_factors.last_webauthn_challenge_data IS 'Stores the latest WebAuthn challenge data including attestation/assertion for customer verification';


--
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    nonce text,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_nonce_length CHECK ((char_length(nonce) <= 255)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


ALTER TABLE auth.oauth_authorizations OWNER TO supabase_auth_admin;

--
-- Name: oauth_client_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_client_states (
    id uuid NOT NULL,
    provider_type text NOT NULL,
    code_verifier text,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE auth.oauth_client_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE oauth_client_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.oauth_client_states IS 'Stores OAuth states for third-party provider authentication flows where Supabase acts as the OAuth client.';


--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048))
);


ALTER TABLE auth.oauth_clients OWNER TO supabase_auth_admin;

--
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


ALTER TABLE auth.oauth_consents OWNER TO supabase_auth_admin;

--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid,
    refresh_token_hmac_key text,
    refresh_token_counter bigint,
    scopes text,
    CONSTRAINT sessions_scopes_length CHECK ((char_length(scopes) <= 4096))
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: COLUMN sessions.refresh_token_hmac_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_hmac_key IS 'Holds a HMAC-SHA256 key used to sign refresh tokens for this session.';


--
-- Name: COLUMN sessions.refresh_token_counter; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_counter IS 'Holds the ID (counter) of the last issued refresh token.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: ab_test_assignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ab_test_assignments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    session_id text,
    test_name text NOT NULL,
    variant text NOT NULL,
    is_active boolean DEFAULT true,
    converted boolean DEFAULT false,
    converted_at timestamp with time zone,
    conversion_value numeric(12,2),
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    assigned_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.ab_test_assignments OWNER TO postgres;

--
-- Name: ab_tests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ab_tests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    variants jsonb DEFAULT '["control", "variant"]'::jsonb NOT NULL,
    traffic_allocation jsonb DEFAULT '{"control": 50, "variant": 50}'::jsonb,
    target_metric text,
    is_active boolean DEFAULT true,
    starts_at timestamp with time zone DEFAULT now(),
    ends_at timestamp with time zone,
    created_by uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.ab_tests OWNER TO postgres;

--
-- Name: admin_activity_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_activity_log (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    admin_id uuid NOT NULL,
    action text NOT NULL,
    entity_type text NOT NULL,
    entity_id uuid,
    old_values jsonb,
    new_values jsonb,
    ip_address text,
    user_agent text,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    action_type text,
    target_type text,
    target_id uuid,
    details jsonb
);


ALTER TABLE public.admin_activity_log OWNER TO postgres;

--
-- Name: admin_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    permissions jsonb DEFAULT '[]'::jsonb NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    is_system boolean DEFAULT false,
    created_by uuid
);


ALTER TABLE public.admin_roles OWNER TO postgres;

--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    role text DEFAULT 'moderator'::text,
    permissions jsonb DEFAULT '[]'::jsonb,
    created_by uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_login timestamp with time zone,
    is_active boolean DEFAULT true
);


ALTER TABLE public.admin_users OWNER TO postgres;

--
-- Name: analytics_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.analytics_events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    session_id text,
    event_type text NOT NULL,
    event_category text,
    event_action text,
    event_label text,
    event_value numeric(12,2),
    page_url text,
    referrer text,
    device_type text,
    os text,
    browser text,
    ip_address text,
    location jsonb,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    event_name text,
    properties jsonb,
    platform text,
    app_version text
);


ALTER TABLE public.analytics_events OWNER TO postgres;

--
-- Name: contact_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact_messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    name text NOT NULL,
    email text NOT NULL,
    subject text,
    message text NOT NULL,
    status text DEFAULT 'new'::text,
    responded_at timestamp with time zone,
    response text,
    created_at timestamp with time zone DEFAULT now(),
    phone text,
    assigned_to uuid,
    responded_by uuid
);


ALTER TABLE public.contact_messages OWNER TO postgres;

--
-- Name: conversations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    listing_id uuid,
    buyer_id uuid,
    seller_id uuid,
    last_message_at timestamp with time zone DEFAULT now(),
    last_message_preview text,
    buyer_unread_count integer DEFAULT 0,
    seller_unread_count integer DEFAULT 0,
    status text DEFAULT 'active'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_message text,
    unread_count_user1 integer DEFAULT 0,
    unread_count_user2 integer DEFAULT 0,
    user1_deleted boolean DEFAULT false,
    user2_deleted boolean DEFAULT false
);


ALTER TABLE public.conversations OWNER TO postgres;

--
-- Name: dealers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dealers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    business_name text NOT NULL,
    business_address text,
    business_phone text,
    business_email text,
    logo_url text,
    website text,
    description text,
    license_number text,
    verified boolean DEFAULT false,
    rating numeric(3,2) DEFAULT 0,
    review_count integer DEFAULT 0,
    subscription_tier text DEFAULT 'basic'::text,
    subscription_expires_at timestamp with time zone,
    listing_limit integer DEFAULT 10,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    listings_count integer DEFAULT 0,
    is_verified boolean DEFAULT false,
    banner_url text
);


ALTER TABLE public.dealers OWNER TO postgres;

--
-- Name: deleted_conversations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deleted_conversations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    conversation_id uuid NOT NULL,
    user_id uuid NOT NULL,
    deleted_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.deleted_conversations OWNER TO postgres;

--
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    listing_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    vehicle_id uuid,
    notes text,
    price_at_save numeric(12,2)
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- Name: inspections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspections (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    vehicle_id uuid,
    listing_id uuid,
    user_id uuid NOT NULL,
    inspector_id uuid,
    inspection_type text NOT NULL,
    status text DEFAULT 'pending'::text,
    scheduled_date date,
    scheduled_time time without time zone,
    location_type text,
    location_address text,
    location_city text,
    location_state text,
    location_zip text,
    price numeric(10,2),
    payment_status text DEFAULT 'pending'::text,
    purchase_id uuid,
    report_url text,
    report_data jsonb,
    overall_score integer,
    notes text,
    inspector_notes text,
    completed_at timestamp with time zone,
    cancelled_at timestamp with time zone,
    cancellation_reason text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    inspection_date timestamp with time zone,
    score integer,
    findings jsonb,
    paid boolean DEFAULT false,
    CONSTRAINT inspections_inspection_type_check CHECK ((inspection_type = ANY (ARRAY['basic'::text, 'standard'::text, 'comprehensive'::text, 'pre_purchase'::text]))),
    CONSTRAINT inspections_location_type_check CHECK ((location_type = ANY (ARRAY['seller_location'::text, 'inspector_location'::text, 'neutral_location'::text]))),
    CONSTRAINT inspections_payment_status_check CHECK ((payment_status = ANY (ARRAY['pending'::text, 'paid'::text, 'refunded'::text]))),
    CONSTRAINT inspections_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'in_progress'::text, 'completed'::text, 'cancelled'::text])))
);


ALTER TABLE public.inspections OWNER TO postgres;

--
-- Name: inspectors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspectors (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    company_name text,
    email text NOT NULL,
    phone text,
    avatar_url text,
    bio text,
    certifications jsonb DEFAULT '[]'::jsonb,
    service_areas jsonb DEFAULT '[]'::jsonb,
    city text,
    state text,
    zip_code text,
    latitude numeric(10,8),
    longitude numeric(11,8),
    rating numeric(3,2) DEFAULT 0,
    reviews_count integer DEFAULT 0,
    inspections_count integer DEFAULT 0,
    price_range jsonb DEFAULT '{"max": 300, "min": 100}'::jsonb,
    availability jsonb DEFAULT '{}'::jsonb,
    is_verified boolean DEFAULT false,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    user_id uuid,
    service_area text[],
    review_count integer DEFAULT 0,
    hourly_rate numeric(10,2)
);


ALTER TABLE public.inspectors OWNER TO postgres;

--
-- Name: linked_accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.linked_accounts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    provider text NOT NULL,
    provider_user_id text NOT NULL,
    provider_email text,
    provider_name text,
    provider_avatar text,
    access_token text,
    refresh_token text,
    token_expires_at timestamp with time zone,
    linked_at timestamp with time zone DEFAULT now(),
    CONSTRAINT linked_accounts_provider_check CHECK ((provider = ANY (ARRAY['google'::text, 'apple'::text, 'facebook'::text, 'twitter'::text])))
);


ALTER TABLE public.linked_accounts OWNER TO postgres;

--
-- Name: listing_boosts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listing_boosts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    vehicle_id uuid,
    listing_id uuid,
    user_id uuid NOT NULL,
    boost_type text NOT NULL,
    purchase_id uuid,
    amount_paid numeric(10,2) NOT NULL,
    duration_days integer NOT NULL,
    impressions integer DEFAULT 0,
    clicks integer DEFAULT 0,
    starts_at timestamp with time zone DEFAULT now(),
    expires_at timestamp with time zone NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    status text DEFAULT 'active'::text,
    CONSTRAINT listing_boosts_boost_type_check CHECK ((boost_type = ANY (ARRAY['featured'::text, 'spotlight'::text, 'premium'::text, 'urgent'::text])))
);


ALTER TABLE public.listing_boosts OWNER TO postgres;

--
-- Name: listing_reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listing_reports (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    reporter_id uuid NOT NULL,
    vehicle_id uuid,
    listing_id uuid,
    reason text NOT NULL,
    reason_category text,
    description text,
    evidence_urls jsonb DEFAULT '[]'::jsonb,
    status text DEFAULT 'pending'::text,
    resolution text,
    action_taken text,
    reviewed_by uuid,
    reviewed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    admin_notes text,
    resolved_by uuid,
    resolved_at timestamp with time zone,
    CONSTRAINT listing_reports_reason_category_check CHECK ((reason_category = ANY (ARRAY['spam'::text, 'scam'::text, 'wrong_info'::text, 'duplicate'::text, 'sold'::text, 'inappropriate'::text, 'other'::text]))),
    CONSTRAINT listing_reports_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'under_review'::text, 'resolved'::text, 'dismissed'::text])))
);


ALTER TABLE public.listing_reports OWNER TO postgres;

--
-- Name: listings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    dealer_id uuid,
    title text NOT NULL,
    description text,
    make text NOT NULL,
    model text NOT NULL,
    year integer NOT NULL,
    price numeric(12,2) NOT NULL,
    mileage integer,
    vin text,
    exterior_color text,
    interior_color text,
    fuel_type text,
    transmission text,
    drivetrain text,
    engine text,
    body_type text,
    condition text,
    features jsonb DEFAULT '[]'::jsonb,
    images jsonb DEFAULT '[]'::jsonb,
    videos jsonb DEFAULT '[]'::jsonb,
    location text,
    latitude numeric(10,8),
    longitude numeric(11,8),
    status text DEFAULT 'active'::text,
    is_featured boolean DEFAULT false,
    is_boosted boolean DEFAULT false,
    boost_expires_at timestamp with time zone,
    views integer DEFAULT 0,
    favorites_count integer DEFAULT 0,
    is_draft boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    views_count integer DEFAULT 0,
    boost_type text,
    boost_started_at timestamp with time zone
);


ALTER TABLE public.listings OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    conversation_id uuid,
    sender_id uuid,
    content text,
    message_type text DEFAULT 'text'::text,
    attachments jsonb DEFAULT '[]'::jsonb,
    is_read boolean DEFAULT false,
    read_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    attachment_url text,
    attachment_type text,
    voice_url text,
    voice_duration integer,
    deleted_at timestamp with time zone
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: muted_conversations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.muted_conversations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    conversation_id uuid NOT NULL,
    user_id uuid NOT NULL,
    muted_until timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    muted_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.muted_conversations OWNER TO postgres;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    type text NOT NULL,
    title text NOT NULL,
    body text,
    data jsonb DEFAULT '{}'::jsonb,
    is_read boolean DEFAULT false,
    read_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    action_url text,
    push_sent boolean DEFAULT false
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: offer_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offer_messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    offer_id uuid NOT NULL,
    sender_id uuid NOT NULL,
    message text NOT NULL,
    message_type text DEFAULT 'text'::text,
    counter_offer_amount numeric(12,2),
    attachments jsonb DEFAULT '[]'::jsonb,
    is_read boolean DEFAULT false,
    read_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    content text,
    attachment_url text,
    CONSTRAINT offer_messages_message_type_check CHECK ((message_type = ANY (ARRAY['text'::text, 'image'::text, 'counter_offer'::text, 'system'::text])))
);


ALTER TABLE public.offer_messages OWNER TO postgres;

--
-- Name: offer_notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offer_notifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    offer_id uuid NOT NULL,
    type text NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    is_read boolean DEFAULT false,
    read_at timestamp with time zone,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    notification_type text,
    body text,
    data jsonb,
    CONSTRAINT offer_notifications_type_check CHECK ((type = ANY (ARRAY['new_offer'::text, 'counter_offer'::text, 'offer_accepted'::text, 'offer_rejected'::text, 'offer_expired'::text, 'new_message'::text])))
);


ALTER TABLE public.offer_notifications OWNER TO postgres;

--
-- Name: offer_typing_indicators; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offer_typing_indicators (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    offer_id uuid NOT NULL,
    user_id uuid NOT NULL,
    is_typing boolean DEFAULT false,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.offer_typing_indicators OWNER TO postgres;

--
-- Name: offers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    listing_id uuid,
    buyer_id uuid,
    seller_id uuid,
    amount numeric(12,2) NOT NULL,
    message text,
    status text DEFAULT 'pending'::text,
    counter_amount numeric(12,2),
    counter_message text,
    expires_at timestamp with time zone,
    responded_at timestamp with time zone,
    is_deleted boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    countered_at timestamp with time zone,
    is_read boolean DEFAULT false,
    seller_read boolean DEFAULT false,
    buyer_read boolean DEFAULT false,
    deleted_by_seller boolean DEFAULT false,
    deleted_by_buyer boolean DEFAULT false
);


ALTER TABLE public.offers OWNER TO postgres;

--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    purchase_id uuid,
    amount numeric(10,2) NOT NULL,
    currency text DEFAULT 'USD'::text,
    status text DEFAULT 'pending'::text,
    payment_method text,
    payment_provider text,
    provider_payment_id text,
    provider_customer_id text,
    card_last_four text,
    card_brand text,
    billing_email text,
    billing_name text,
    billing_address jsonb,
    failure_reason text,
    refund_reason text,
    refunded_at timestamp with time zone,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    payment_type text,
    stripe_payment_id text,
    stripe_charge_id text,
    description text,
    refunded boolean DEFAULT false,
    refund_amount numeric(12,2),
    CONSTRAINT payments_payment_provider_check CHECK ((payment_provider = ANY (ARRAY['stripe'::text, 'apple'::text, 'google'::text, 'paypal'::text]))),
    CONSTRAINT payments_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'processing'::text, 'completed'::text, 'failed'::text, 'refunded'::text])))
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: phone_otps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phone_otps (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    phone_number text NOT NULL,
    otp_code text NOT NULL,
    purpose text DEFAULT 'verification'::text,
    attempts integer DEFAULT 0,
    max_attempts integer DEFAULT 3,
    is_used boolean DEFAULT false,
    used_at timestamp with time zone,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    phone text,
    verified boolean DEFAULT false,
    verified_at timestamp with time zone,
    CONSTRAINT phone_otps_purpose_check CHECK ((purpose = ANY (ARRAY['verification'::text, 'login'::text, '2fa'::text, 'password_reset'::text])))
);


ALTER TABLE public.phone_otps OWNER TO postgres;

--
-- Name: price_alerts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.price_alerts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    vehicle_id uuid,
    listing_id uuid,
    target_price numeric(12,2) NOT NULL,
    original_price numeric(12,2),
    alert_type text DEFAULT 'below'::text,
    percentage_threshold integer,
    is_active boolean DEFAULT true,
    triggered_at timestamp with time zone,
    notification_sent boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_notified_at timestamp with time zone,
    notification_count integer DEFAULT 0,
    current_price numeric(12,2),
    CONSTRAINT price_alerts_alert_type_check CHECK ((alert_type = ANY (ARRAY['below'::text, 'any_change'::text, 'percentage_drop'::text])))
);


ALTER TABLE public.price_alerts OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text,
    full_name text,
    phone text,
    phone_verified boolean DEFAULT false,
    avatar_url text,
    location text,
    bio text,
    is_dealer boolean DEFAULT false,
    dealer_id uuid,
    email_verified boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    subscription_tier text DEFAULT 'free'::text,
    subscription_expires_at timestamp with time zone,
    push_enabled boolean DEFAULT true
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: promo_code_usage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promo_code_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    promo_code_id uuid NOT NULL,
    user_id uuid NOT NULL,
    purchase_id uuid,
    discount_applied numeric(10,2) NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.promo_code_usage OWNER TO postgres;

--
-- Name: promo_codes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promo_codes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    code text NOT NULL,
    description text,
    discount_type text NOT NULL,
    discount_value numeric(10,2) NOT NULL,
    max_discount numeric(10,2),
    min_purchase numeric(10,2) DEFAULT 0,
    applicable_to jsonb DEFAULT '["all"]'::jsonb,
    usage_limit integer,
    usage_count integer DEFAULT 0,
    per_user_limit integer DEFAULT 1,
    starts_at timestamp with time zone DEFAULT now(),
    expires_at timestamp with time zone,
    is_active boolean DEFAULT true,
    created_by uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    max_uses integer,
    current_uses integer DEFAULT 0,
    valid_from timestamp with time zone,
    valid_until timestamp with time zone,
    CONSTRAINT promo_codes_discount_type_check CHECK ((discount_type = ANY (ARRAY['percentage'::text, 'fixed'::text])))
);


ALTER TABLE public.promo_codes OWNER TO postgres;

--
-- Name: purchases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchases (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    type text NOT NULL,
    item_id uuid,
    amount numeric(10,2) NOT NULL,
    currency text DEFAULT 'USD'::text,
    status text DEFAULT 'pending'::text,
    payment_method text,
    payment_provider text,
    transaction_id text,
    receipt_url text,
    metadata jsonb DEFAULT '{}'::jsonb,
    promo_code_id uuid,
    discount_amount numeric(10,2) DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    buyer_id uuid,
    seller_id uuid,
    vehicle_id uuid,
    listing_id uuid,
    offer_id uuid,
    purchase_price numeric(12,2),
    payment_id uuid,
    completed_at timestamp with time zone,
    cancelled_at timestamp with time zone,
    cancellation_reason text,
    CONSTRAINT purchases_payment_provider_check CHECK ((payment_provider = ANY (ARRAY['stripe'::text, 'apple'::text, 'google'::text, 'paypal'::text]))),
    CONSTRAINT purchases_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'completed'::text, 'failed'::text, 'refunded'::text, 'cancelled'::text]))),
    CONSTRAINT purchases_type_check CHECK ((type = ANY (ARRAY['subscription'::text, 'boost'::text, 'vin_report'::text, 'featured_listing'::text, 'other'::text])))
);


ALTER TABLE public.purchases OWNER TO postgres;

--
-- Name: push_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.push_tokens (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    token text NOT NULL,
    platform text NOT NULL,
    device_id text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    device_type text,
    last_used timestamp with time zone
);


ALTER TABLE public.push_tokens OWNER TO postgres;

--
-- Name: recently_viewed; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recently_viewed (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    listing_id uuid,
    viewed_at timestamp with time zone DEFAULT now(),
    vehicle_id uuid,
    view_duration integer
);


ALTER TABLE public.recently_viewed OWNER TO postgres;

--
-- Name: refund_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refund_requests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    purchase_id uuid NOT NULL,
    payment_id uuid,
    amount numeric(10,2) NOT NULL,
    reason text NOT NULL,
    reason_category text,
    status text DEFAULT 'pending'::text,
    admin_notes text,
    reviewed_by uuid,
    reviewed_at timestamp with time zone,
    refund_transaction_id text,
    processed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    processed_by uuid,
    CONSTRAINT refund_requests_reason_category_check CHECK ((reason_category = ANY (ARRAY['not_as_described'::text, 'duplicate'::text, 'unauthorized'::text, 'service_issue'::text, 'other'::text]))),
    CONSTRAINT refund_requests_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'under_review'::text, 'approved'::text, 'rejected'::text, 'processed'::text])))
);


ALTER TABLE public.refund_requests OWNER TO postgres;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    reviewer_id uuid,
    reviewed_user_id uuid,
    listing_id uuid,
    rating integer NOT NULL,
    title text,
    content text,
    response text,
    response_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    reviewee_id uuid,
    vehicle_id uuid,
    is_verified_purchase boolean DEFAULT false,
    helpful_count integer DEFAULT 0,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: saved_searches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_searches (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    name text NOT NULL,
    filters jsonb NOT NULL,
    notify_email boolean DEFAULT false,
    notify_push boolean DEFAULT true,
    last_notified_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    notify_enabled boolean DEFAULT true,
    match_count integer DEFAULT 0,
    last_match_vehicle_id uuid,
    last_run_at timestamp with time zone,
    notifications_enabled boolean DEFAULT true
);


ALTER TABLE public.saved_searches OWNER TO postgres;

--
-- Name: scheduled_admin_actions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scheduled_admin_actions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    admin_id uuid NOT NULL,
    action_type text NOT NULL,
    target_type text NOT NULL,
    target_id uuid,
    action_data jsonb DEFAULT '{}'::jsonb,
    scheduled_for timestamp with time zone NOT NULL,
    status text DEFAULT 'pending'::text,
    result jsonb,
    error_message text,
    executed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    parameters jsonb,
    created_by uuid,
    cancelled_at timestamp with time zone,
    cancelled_by uuid,
    CONSTRAINT scheduled_admin_actions_action_type_check CHECK ((action_type = ANY (ARRAY['ban_user'::text, 'unban_user'::text, 'delete_listing'::text, 'restore_listing'::text, 'feature_listing'::text, 'unfeature_listing'::text, 'send_notification'::text, 'expire_promo'::text, 'activate_promo'::text, 'run_report'::text]))),
    CONSTRAINT scheduled_admin_actions_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'processing'::text, 'completed'::text, 'failed'::text, 'cancelled'::text]))),
    CONSTRAINT scheduled_admin_actions_target_type_check CHECK ((target_type = ANY (ARRAY['user'::text, 'listing'::text, 'promo_code'::text, 'notification'::text, 'report'::text])))
);


ALTER TABLE public.scheduled_admin_actions OWNER TO postgres;

--
-- Name: search_cache; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.search_cache (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    cache_key text NOT NULL,
    search_params jsonb NOT NULL,
    results jsonb NOT NULL,
    total_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    expires_at timestamp with time zone NOT NULL,
    results_count integer,
    cached_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.search_cache OWNER TO postgres;

--
-- Name: TABLE search_cache; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.search_cache IS 'Caches search results for performance. Entries expire after TTL and are invalidated when vehicles change.';


--
-- Name: search_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.search_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    search_query text,
    filters jsonb DEFAULT '{}'::jsonb,
    results_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    searched_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.search_history OWNER TO postgres;

--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.site_settings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    key text NOT NULL,
    value jsonb NOT NULL,
    description text,
    category text DEFAULT 'general'::text,
    is_public boolean DEFAULT false,
    updated_by uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.site_settings OWNER TO postgres;

--
-- Name: subscription_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscription_events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    subscription_id uuid,
    user_id uuid NOT NULL,
    event_type text NOT NULL,
    old_plan text,
    new_plan text,
    amount numeric(10,2),
    currency text DEFAULT 'USD'::text,
    provider text,
    provider_event_id text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    stripe_event_id text,
    data jsonb,
    processed boolean DEFAULT false,
    processed_at timestamp with time zone,
    CONSTRAINT subscription_events_event_type_check CHECK ((event_type = ANY (ARRAY['created'::text, 'renewed'::text, 'upgraded'::text, 'downgraded'::text, 'cancelled'::text, 'expired'::text, 'payment_failed'::text, 'payment_succeeded'::text, 'trial_started'::text, 'trial_ended'::text, 'paused'::text, 'resumed'::text])))
);


ALTER TABLE public.subscription_events OWNER TO postgres;

--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    plan_id text NOT NULL,
    plan_name text NOT NULL,
    status text DEFAULT 'active'::text,
    price numeric(10,2),
    billing_period text DEFAULT 'monthly'::text,
    stripe_subscription_id text,
    stripe_customer_id text,
    apple_receipt text,
    google_purchase_token text,
    current_period_start timestamp with time zone,
    current_period_end timestamp with time zone,
    cancel_at_period_end boolean DEFAULT false,
    cancelled_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    trial_ends_at timestamp with time zone
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- Name: test_drive_bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_drive_bookings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    vehicle_id uuid,
    listing_id uuid,
    user_id uuid NOT NULL,
    seller_id uuid NOT NULL,
    scheduled_date date NOT NULL,
    scheduled_time time without time zone NOT NULL,
    duration_minutes integer DEFAULT 30,
    location_type text,
    location_address text,
    location_city text,
    location_state text,
    location_zip text,
    status text DEFAULT 'pending'::text,
    buyer_notes text,
    seller_notes text,
    confirmation_code text,
    reminder_sent boolean DEFAULT false,
    confirmed_at timestamp with time zone,
    completed_at timestamp with time zone,
    cancelled_at timestamp with time zone,
    cancellation_reason text,
    cancelled_by uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    buyer_id uuid,
    location text,
    notes text,
    CONSTRAINT test_drive_bookings_location_type_check CHECK ((location_type = ANY (ARRAY['seller_location'::text, 'buyer_location'::text, 'neutral_location'::text]))),
    CONSTRAINT test_drive_bookings_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'completed'::text, 'cancelled'::text, 'no_show'::text])))
);


ALTER TABLE public.test_drive_bookings OWNER TO postgres;

--
-- Name: two_factor_auth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.two_factor_auth (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    is_enabled boolean DEFAULT false,
    method text,
    secret_key text,
    backup_codes jsonb DEFAULT '[]'::jsonb,
    phone_number text,
    verified_at timestamp with time zone,
    last_used_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    secret text,
    last_used timestamp with time zone,
    CONSTRAINT two_factor_auth_method_check CHECK ((method = ANY (ARRAY['app'::text, 'sms'::text, 'email'::text])))
);


ALTER TABLE public.two_factor_auth OWNER TO postgres;

--
-- Name: typing_indicators; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.typing_indicators (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    conversation_id uuid,
    user_id uuid,
    is_typing boolean DEFAULT false,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.typing_indicators OWNER TO postgres;

--
-- Name: user_bans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_bans (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    banned_by uuid,
    reason text NOT NULL,
    ban_type text DEFAULT 'temporary'::text,
    expires_at timestamp with time zone,
    is_active boolean DEFAULT true,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    lifted_at timestamp with time zone,
    lifted_by uuid,
    lift_reason text,
    CONSTRAINT user_bans_ban_type_check CHECK ((ban_type = ANY (ARRAY['temporary'::text, 'permanent'::text])))
);


ALTER TABLE public.user_bans OWNER TO postgres;

--
-- Name: user_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_preferences (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    theme text DEFAULT 'system'::text,
    language text DEFAULT 'en'::text,
    currency text DEFAULT 'USD'::text,
    distance_unit text DEFAULT 'miles'::text,
    notifications_email boolean DEFAULT true,
    notifications_push boolean DEFAULT true,
    notifications_sms boolean DEFAULT false,
    notifications_marketing boolean DEFAULT false,
    notifications_price_alerts boolean DEFAULT true,
    notifications_new_messages boolean DEFAULT true,
    notifications_offer_updates boolean DEFAULT true,
    notifications_saved_search boolean DEFAULT true,
    privacy_show_online boolean DEFAULT true,
    privacy_show_last_seen boolean DEFAULT true,
    privacy_show_read_receipts boolean DEFAULT true,
    search_radius integer DEFAULT 50,
    default_search_filters jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    push_notifications boolean DEFAULT true,
    email_notifications boolean DEFAULT true,
    sms_notifications boolean DEFAULT false,
    price_alert_notifications boolean DEFAULT true,
    message_notifications boolean DEFAULT true,
    offer_notifications boolean DEFAULT true,
    marketing_emails boolean DEFAULT false,
    preferred_language text DEFAULT 'en'::text,
    preferred_currency text DEFAULT 'USD'::text,
    CONSTRAINT user_preferences_distance_unit_check CHECK ((distance_unit = ANY (ARRAY['miles'::text, 'km'::text]))),
    CONSTRAINT user_preferences_theme_check CHECK ((theme = ANY (ARRAY['light'::text, 'dark'::text, 'system'::text])))
);


ALTER TABLE public.user_preferences OWNER TO postgres;

--
-- Name: user_reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_reports (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    reporter_id uuid NOT NULL,
    reported_user_id uuid NOT NULL,
    reason text NOT NULL,
    reason_category text,
    description text,
    evidence_urls jsonb DEFAULT '[]'::jsonb,
    status text DEFAULT 'pending'::text,
    resolution text,
    action_taken text,
    reviewed_by uuid,
    reviewed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    admin_notes text,
    resolved_by uuid,
    resolved_at timestamp with time zone,
    CONSTRAINT user_reports_reason_category_check CHECK ((reason_category = ANY (ARRAY['spam'::text, 'harassment'::text, 'fraud'::text, 'inappropriate'::text, 'fake_account'::text, 'other'::text]))),
    CONSTRAINT user_reports_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'under_review'::text, 'resolved'::text, 'dismissed'::text])))
);


ALTER TABLE public.user_reports OWNER TO postgres;

--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    session_token text NOT NULL,
    device_type text,
    device_name text,
    os text,
    browser text,
    ip_address text,
    location text,
    is_current boolean DEFAULT false,
    last_active_at timestamp with time zone DEFAULT now(),
    expires_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    device_id text,
    os_version text,
    app_version text,
    last_active timestamp with time zone
);


ALTER TABLE public.user_sessions OWNER TO postgres;

--
-- Name: user_verifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_verifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    type text NOT NULL,
    status text DEFAULT 'pending'::text,
    verification_code text,
    verified_value text,
    verified_at timestamp with time zone,
    expires_at timestamp with time zone,
    attempts integer DEFAULT 0,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    verified_by uuid,
    CONSTRAINT user_verifications_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'verified'::text, 'failed'::text, 'expired'::text]))),
    CONSTRAINT user_verifications_type_check CHECK ((type = ANY (ARRAY['phone'::text, 'email'::text, 'identity'::text])))
);


ALTER TABLE public.user_verifications OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email text,
    full_name text,
    phone text,
    avatar_url text,
    phone_verified boolean DEFAULT false,
    email_verified boolean DEFAULT false,
    is_dealer boolean DEFAULT false,
    dealer_id uuid,
    notification_preferences jsonb DEFAULT '{"sms": false, "push": true, "email": true}'::jsonb,
    location text,
    bio text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    dealer_tier text DEFAULT 'basic'::text,
    subscription_status text DEFAULT 'none'::text,
    push_token text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: vehicle_inquiries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicle_inquiries (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    vehicle_id uuid,
    listing_id uuid,
    user_id uuid,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    message text NOT NULL,
    inquiry_type text DEFAULT 'general'::text,
    status text DEFAULT 'new'::text,
    replied_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    responded_at timestamp with time zone,
    CONSTRAINT vehicle_inquiries_inquiry_type_check CHECK ((inquiry_type = ANY (ARRAY['general'::text, 'test_drive'::text, 'financing'::text, 'trade_in'::text]))),
    CONSTRAINT vehicle_inquiries_status_check CHECK ((status = ANY (ARRAY['new'::text, 'read'::text, 'replied'::text, 'closed'::text])))
);


ALTER TABLE public.vehicle_inquiries OWNER TO postgres;

--
-- Name: vehicle_views; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicle_views (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    vehicle_id uuid,
    listing_id uuid,
    user_id uuid,
    session_id text,
    ip_address text,
    user_agent text,
    referrer text,
    view_duration integer,
    created_at timestamp with time zone DEFAULT now(),
    viewed_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.vehicle_views OWNER TO postgres;

--
-- Name: vehicles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    dealer_id uuid,
    title text NOT NULL,
    make text NOT NULL,
    model text NOT NULL,
    year integer NOT NULL,
    price numeric(12,2) NOT NULL,
    mileage integer,
    vin text,
    body_type text,
    fuel_type text,
    transmission text,
    drivetrain text,
    exterior_color text,
    interior_color text,
    engine text,
    cylinders integer,
    horsepower integer,
    mpg_city integer,
    mpg_highway integer,
    description text,
    features jsonb DEFAULT '[]'::jsonb,
    images jsonb DEFAULT '[]'::jsonb,
    videos jsonb DEFAULT '[]'::jsonb,
    location text,
    city text,
    state text,
    zip_code text,
    latitude numeric(10,8),
    longitude numeric(11,8),
    condition text DEFAULT 'used'::text,
    status text DEFAULT 'active'::text,
    is_featured boolean DEFAULT false,
    is_boosted boolean DEFAULT false,
    boost_expires_at timestamp with time zone,
    views_count integer DEFAULT 0,
    favorites_count integer DEFAULT 0,
    inquiries_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    search_vector tsvector,
    boost_type text
);


ALTER TABLE public.vehicles OWNER TO postgres;

--
-- Name: video_thumbnails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.video_thumbnails (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    vehicle_id uuid,
    listing_id uuid,
    video_url text NOT NULL,
    thumbnail_url text,
    duration_seconds integer,
    width integer,
    height integer,
    file_size integer,
    format text,
    status text DEFAULT 'processing'::text,
    error_message text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    duration integer,
    generated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT video_thumbnails_status_check CHECK ((status = ANY (ARRAY['processing'::text, 'ready'::text, 'failed'::text])))
);


ALTER TABLE public.video_thumbnails OWNER TO postgres;

--
-- Name: vin_report_cache; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vin_report_cache (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    vin text NOT NULL,
    provider text DEFAULT 'carfax'::text,
    report_data jsonb NOT NULL,
    summary jsonb,
    accidents_count integer DEFAULT 0,
    owners_count integer DEFAULT 0,
    service_records_count integer DEFAULT 0,
    title_issues boolean DEFAULT false,
    is_valid boolean DEFAULT true,
    fetched_at timestamp with time zone DEFAULT now(),
    expires_at timestamp with time zone NOT NULL
);


ALTER TABLE public.vin_report_cache OWNER TO postgres;

--
-- Name: vin_report_purchases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vin_report_purchases (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    vin text NOT NULL,
    vehicle_id uuid,
    listing_id uuid,
    report_type text DEFAULT 'standard'::text,
    purchase_id uuid,
    amount numeric(10,2) NOT NULL,
    report_url text,
    report_data jsonb,
    provider text DEFAULT 'carfax'::text,
    status text DEFAULT 'pending'::text,
    error_message text,
    expires_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    report_id uuid,
    payment_id uuid,
    CONSTRAINT vin_report_purchases_report_type_check CHECK ((report_type = ANY (ARRAY['basic'::text, 'standard'::text, 'premium'::text]))),
    CONSTRAINT vin_report_purchases_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'processing'::text, 'completed'::text, 'failed'::text])))
);


ALTER TABLE public.vin_report_purchases OWNER TO postgres;

--
-- Name: vin_reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vin_reports (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    listing_id uuid,
    vin text NOT NULL,
    report_data jsonb,
    provider text DEFAULT 'vincario'::text,
    purchase_price numeric(10,2),
    payment_id text,
    created_at timestamp with time zone DEFAULT now(),
    is_cached boolean DEFAULT false,
    expires_at timestamp with time zone
);


ALTER TABLE public.vin_reports OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    name text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- Name: buckets_vectors; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_vectors (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'VECTOR'::storage.buckettype NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_vectors OWNER TO supabase_storage_admin;

--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb,
    level integer
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: prefixes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.prefixes (
    bucket_id text NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    level integer GENERATED ALWAYS AS (storage.get_level(name)) STORED NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE storage.prefixes OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: vector_indexes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.vector_indexes (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    bucket_id text NOT NULL,
    data_type text NOT NULL,
    dimension integer NOT NULL,
    distance_metric text NOT NULL,
    metadata_configuration jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.vector_indexes OWNER TO supabase_storage_admin;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- Name: oauth_client_states oauth_client_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_client_states
    ADD CONSTRAINT oauth_client_states_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ab_test_assignments ab_test_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ab_test_assignments
    ADD CONSTRAINT ab_test_assignments_pkey PRIMARY KEY (id);


--
-- Name: ab_test_assignments ab_test_assignments_session_id_test_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ab_test_assignments
    ADD CONSTRAINT ab_test_assignments_session_id_test_name_key UNIQUE (session_id, test_name);


--
-- Name: ab_test_assignments ab_test_assignments_user_id_test_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ab_test_assignments
    ADD CONSTRAINT ab_test_assignments_user_id_test_name_key UNIQUE (user_id, test_name);


--
-- Name: ab_tests ab_tests_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ab_tests
    ADD CONSTRAINT ab_tests_name_key UNIQUE (name);


--
-- Name: ab_tests ab_tests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ab_tests
    ADD CONSTRAINT ab_tests_pkey PRIMARY KEY (id);


--
-- Name: admin_activity_log admin_activity_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_activity_log
    ADD CONSTRAINT admin_activity_log_pkey PRIMARY KEY (id);


--
-- Name: admin_roles admin_roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_name_key UNIQUE (name);


--
-- Name: admin_roles admin_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_user_id_key UNIQUE (user_id);


--
-- Name: analytics_events analytics_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analytics_events
    ADD CONSTRAINT analytics_events_pkey PRIMARY KEY (id);


--
-- Name: contact_messages contact_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_messages
    ADD CONSTRAINT contact_messages_pkey PRIMARY KEY (id);


--
-- Name: conversations conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);


--
-- Name: dealers dealers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dealers
    ADD CONSTRAINT dealers_pkey PRIMARY KEY (id);


--
-- Name: deleted_conversations deleted_conversations_conversation_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deleted_conversations
    ADD CONSTRAINT deleted_conversations_conversation_id_user_id_key UNIQUE (conversation_id, user_id);


--
-- Name: deleted_conversations deleted_conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deleted_conversations
    ADD CONSTRAINT deleted_conversations_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_user_id_listing_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_listing_id_key UNIQUE (user_id, listing_id);


--
-- Name: inspections inspections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_pkey PRIMARY KEY (id);


--
-- Name: inspectors inspectors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspectors
    ADD CONSTRAINT inspectors_pkey PRIMARY KEY (id);


--
-- Name: linked_accounts linked_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.linked_accounts
    ADD CONSTRAINT linked_accounts_pkey PRIMARY KEY (id);


--
-- Name: linked_accounts linked_accounts_provider_provider_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.linked_accounts
    ADD CONSTRAINT linked_accounts_provider_provider_user_id_key UNIQUE (provider, provider_user_id);


--
-- Name: linked_accounts linked_accounts_user_id_provider_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.linked_accounts
    ADD CONSTRAINT linked_accounts_user_id_provider_key UNIQUE (user_id, provider);


--
-- Name: listing_boosts listing_boosts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing_boosts
    ADD CONSTRAINT listing_boosts_pkey PRIMARY KEY (id);


--
-- Name: listing_reports listing_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing_reports
    ADD CONSTRAINT listing_reports_pkey PRIMARY KEY (id);


--
-- Name: listings listings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: muted_conversations muted_conversations_conversation_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.muted_conversations
    ADD CONSTRAINT muted_conversations_conversation_id_user_id_key UNIQUE (conversation_id, user_id);


--
-- Name: muted_conversations muted_conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.muted_conversations
    ADD CONSTRAINT muted_conversations_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: offer_messages offer_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_messages
    ADD CONSTRAINT offer_messages_pkey PRIMARY KEY (id);


--
-- Name: offer_notifications offer_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_notifications
    ADD CONSTRAINT offer_notifications_pkey PRIMARY KEY (id);


--
-- Name: offer_typing_indicators offer_typing_indicators_offer_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_typing_indicators
    ADD CONSTRAINT offer_typing_indicators_offer_id_user_id_key UNIQUE (offer_id, user_id);


--
-- Name: offer_typing_indicators offer_typing_indicators_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_typing_indicators
    ADD CONSTRAINT offer_typing_indicators_pkey PRIMARY KEY (id);


--
-- Name: offers offers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: phone_otps phone_otps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phone_otps
    ADD CONSTRAINT phone_otps_pkey PRIMARY KEY (id);


--
-- Name: price_alerts price_alerts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.price_alerts
    ADD CONSTRAINT price_alerts_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: promo_code_usage promo_code_usage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promo_code_usage
    ADD CONSTRAINT promo_code_usage_pkey PRIMARY KEY (id);


--
-- Name: promo_code_usage promo_code_usage_promo_code_id_user_id_purchase_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promo_code_usage
    ADD CONSTRAINT promo_code_usage_promo_code_id_user_id_purchase_id_key UNIQUE (promo_code_id, user_id, purchase_id);


--
-- Name: promo_codes promo_codes_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promo_codes
    ADD CONSTRAINT promo_codes_code_key UNIQUE (code);


--
-- Name: promo_codes promo_codes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promo_codes
    ADD CONSTRAINT promo_codes_pkey PRIMARY KEY (id);


--
-- Name: purchases purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_pkey PRIMARY KEY (id);


--
-- Name: push_tokens push_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.push_tokens
    ADD CONSTRAINT push_tokens_pkey PRIMARY KEY (id);


--
-- Name: push_tokens push_tokens_user_id_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.push_tokens
    ADD CONSTRAINT push_tokens_user_id_token_key UNIQUE (user_id, token);


--
-- Name: recently_viewed recently_viewed_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recently_viewed
    ADD CONSTRAINT recently_viewed_pkey PRIMARY KEY (id);


--
-- Name: recently_viewed recently_viewed_user_id_listing_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recently_viewed
    ADD CONSTRAINT recently_viewed_user_id_listing_id_key UNIQUE (user_id, listing_id);


--
-- Name: refund_requests refund_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refund_requests
    ADD CONSTRAINT refund_requests_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: saved_searches saved_searches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_searches
    ADD CONSTRAINT saved_searches_pkey PRIMARY KEY (id);


--
-- Name: scheduled_admin_actions scheduled_admin_actions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scheduled_admin_actions
    ADD CONSTRAINT scheduled_admin_actions_pkey PRIMARY KEY (id);


--
-- Name: search_cache search_cache_cache_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_cache
    ADD CONSTRAINT search_cache_cache_key_key UNIQUE (cache_key);


--
-- Name: search_cache search_cache_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_cache
    ADD CONSTRAINT search_cache_pkey PRIMARY KEY (id);


--
-- Name: search_history search_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_history
    ADD CONSTRAINT search_history_pkey PRIMARY KEY (id);


--
-- Name: site_settings site_settings_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_key_key UNIQUE (key);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: subscription_events subscription_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscription_events
    ADD CONSTRAINT subscription_events_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: test_drive_bookings test_drive_bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_drive_bookings
    ADD CONSTRAINT test_drive_bookings_pkey PRIMARY KEY (id);


--
-- Name: two_factor_auth two_factor_auth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.two_factor_auth
    ADD CONSTRAINT two_factor_auth_pkey PRIMARY KEY (id);


--
-- Name: two_factor_auth two_factor_auth_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.two_factor_auth
    ADD CONSTRAINT two_factor_auth_user_id_key UNIQUE (user_id);


--
-- Name: typing_indicators typing_indicators_conversation_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.typing_indicators
    ADD CONSTRAINT typing_indicators_conversation_id_user_id_key UNIQUE (conversation_id, user_id);


--
-- Name: typing_indicators typing_indicators_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.typing_indicators
    ADD CONSTRAINT typing_indicators_pkey PRIMARY KEY (id);


--
-- Name: user_bans user_bans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_bans
    ADD CONSTRAINT user_bans_pkey PRIMARY KEY (id);


--
-- Name: user_preferences user_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_pkey PRIMARY KEY (id);


--
-- Name: user_preferences user_preferences_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_user_id_key UNIQUE (user_id);


--
-- Name: user_reports user_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_reports
    ADD CONSTRAINT user_reports_pkey PRIMARY KEY (id);


--
-- Name: user_sessions user_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (id);


--
-- Name: user_sessions user_sessions_session_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_session_token_key UNIQUE (session_token);


--
-- Name: user_verifications user_verifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_verifications
    ADD CONSTRAINT user_verifications_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vehicle_inquiries vehicle_inquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_inquiries
    ADD CONSTRAINT vehicle_inquiries_pkey PRIMARY KEY (id);


--
-- Name: vehicle_views vehicle_views_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_views
    ADD CONSTRAINT vehicle_views_pkey PRIMARY KEY (id);


--
-- Name: vehicles vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_pkey PRIMARY KEY (id);


--
-- Name: video_thumbnails video_thumbnails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_thumbnails
    ADD CONSTRAINT video_thumbnails_pkey PRIMARY KEY (id);


--
-- Name: vin_report_cache vin_report_cache_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vin_report_cache
    ADD CONSTRAINT vin_report_cache_pkey PRIMARY KEY (id);


--
-- Name: vin_report_cache vin_report_cache_vin_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vin_report_cache
    ADD CONSTRAINT vin_report_cache_vin_key UNIQUE (vin);


--
-- Name: vin_report_purchases vin_report_purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vin_report_purchases
    ADD CONSTRAINT vin_report_purchases_pkey PRIMARY KEY (id);


--
-- Name: vin_reports vin_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vin_reports
    ADD CONSTRAINT vin_reports_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: buckets_vectors buckets_vectors_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_vectors
    ADD CONSTRAINT buckets_vectors_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: prefixes prefixes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT prefixes_pkey PRIMARY KEY (bucket_id, level, name);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: vector_indexes vector_indexes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_oauth_client_states_created_at; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_oauth_client_states_created_at ON auth.oauth_client_states USING btree (created_at);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: idx_ab_assignments_test; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ab_assignments_test ON public.ab_test_assignments USING btree (test_name);


--
-- Name: idx_ab_assignments_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ab_assignments_user ON public.ab_test_assignments USING btree (user_id);


--
-- Name: idx_ab_assignments_variant; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ab_assignments_variant ON public.ab_test_assignments USING btree (test_name, variant);


--
-- Name: idx_ab_tests_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ab_tests_active ON public.ab_tests USING btree (is_active) WHERE (is_active = true);


--
-- Name: idx_admin_activity_action; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_admin_activity_action ON public.admin_activity_log USING btree (action);


--
-- Name: idx_admin_activity_admin_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_admin_activity_admin_id ON public.admin_activity_log USING btree (admin_id);


--
-- Name: idx_admin_activity_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_admin_activity_created_at ON public.admin_activity_log USING btree (created_at DESC);


--
-- Name: idx_admin_activity_entity; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_admin_activity_entity ON public.admin_activity_log USING btree (entity_type, entity_id);


--
-- Name: idx_analytics_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_analytics_created_at ON public.analytics_events USING btree (created_at DESC);


--
-- Name: idx_analytics_event_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_analytics_event_type ON public.analytics_events USING btree (event_type);


--
-- Name: idx_analytics_session; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_analytics_session ON public.analytics_events USING btree (session_id);


--
-- Name: idx_analytics_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_analytics_user_id ON public.analytics_events USING btree (user_id);


--
-- Name: idx_conversations_buyer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_conversations_buyer_id ON public.conversations USING btree (buyer_id);


--
-- Name: idx_conversations_last_message_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_conversations_last_message_at ON public.conversations USING btree (last_message_at DESC);


--
-- Name: idx_conversations_seller_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_conversations_seller_id ON public.conversations USING btree (seller_id);


--
-- Name: idx_deleted_conversations_conv; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_deleted_conversations_conv ON public.deleted_conversations USING btree (conversation_id);


--
-- Name: idx_deleted_conversations_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_deleted_conversations_user ON public.deleted_conversations USING btree (user_id);


--
-- Name: idx_favorites_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_favorites_created_at ON public.favorites USING btree (created_at DESC);


--
-- Name: idx_favorites_listing_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_favorites_listing_id ON public.favorites USING btree (listing_id);


--
-- Name: idx_favorites_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_favorites_user_id ON public.favorites USING btree (user_id);


--
-- Name: idx_favorites_vehicle_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_favorites_vehicle_id ON public.favorites USING btree (vehicle_id);


--
-- Name: idx_inspections_inspector_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inspections_inspector_id ON public.inspections USING btree (inspector_id);


--
-- Name: idx_inspections_listing_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inspections_listing_id ON public.inspections USING btree (listing_id);


--
-- Name: idx_inspections_scheduled_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inspections_scheduled_date ON public.inspections USING btree (scheduled_date);


--
-- Name: idx_inspections_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inspections_status ON public.inspections USING btree (status);


--
-- Name: idx_inspections_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inspections_user_id ON public.inspections USING btree (user_id);


--
-- Name: idx_inspections_vehicle_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inspections_vehicle_id ON public.inspections USING btree (vehicle_id);


--
-- Name: idx_inspectors_is_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inspectors_is_active ON public.inspectors USING btree (is_active) WHERE (is_active = true);


--
-- Name: idx_inspectors_location; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inspectors_location ON public.inspectors USING btree (city, state);


--
-- Name: idx_inspectors_rating; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inspectors_rating ON public.inspectors USING btree (rating DESC);


--
-- Name: idx_linked_accounts_provider; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_linked_accounts_provider ON public.linked_accounts USING btree (provider, provider_user_id);


--
-- Name: idx_linked_accounts_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_linked_accounts_user_id ON public.linked_accounts USING btree (user_id);


--
-- Name: idx_listing_boosts_expires_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listing_boosts_expires_at ON public.listing_boosts USING btree (expires_at);


--
-- Name: idx_listing_boosts_is_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listing_boosts_is_active ON public.listing_boosts USING btree (is_active) WHERE (is_active = true);


--
-- Name: idx_listing_boosts_listing_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listing_boosts_listing_id ON public.listing_boosts USING btree (listing_id);


--
-- Name: idx_listing_boosts_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listing_boosts_user_id ON public.listing_boosts USING btree (user_id);


--
-- Name: idx_listing_boosts_vehicle_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listing_boosts_vehicle_id ON public.listing_boosts USING btree (vehicle_id);


--
-- Name: idx_listing_reports_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listing_reports_created ON public.listing_reports USING btree (created_at DESC);


--
-- Name: idx_listing_reports_listing; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listing_reports_listing ON public.listing_reports USING btree (listing_id);


--
-- Name: idx_listing_reports_reporter; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listing_reports_reporter ON public.listing_reports USING btree (reporter_id);


--
-- Name: idx_listing_reports_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listing_reports_status ON public.listing_reports USING btree (status);


--
-- Name: idx_listing_reports_vehicle; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listing_reports_vehicle ON public.listing_reports USING btree (vehicle_id);


--
-- Name: idx_listings_boost_expires; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listings_boost_expires ON public.listings USING btree (boost_expires_at) WHERE (boost_expires_at IS NOT NULL);


--
-- Name: idx_listings_boost_expires_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listings_boost_expires_at ON public.listings USING btree (boost_expires_at) WHERE (boost_expires_at IS NOT NULL);


--
-- Name: idx_listings_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listings_created_at ON public.listings USING btree (created_at DESC);


--
-- Name: idx_listings_dealer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listings_dealer_id ON public.listings USING btree (dealer_id);


--
-- Name: idx_listings_is_boosted; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listings_is_boosted ON public.listings USING btree (is_boosted) WHERE (is_boosted = true);


--
-- Name: idx_listings_make; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listings_make ON public.listings USING btree (make);


--
-- Name: idx_listings_model; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listings_model ON public.listings USING btree (model);


--
-- Name: idx_listings_price; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listings_price ON public.listings USING btree (price);


--
-- Name: idx_listings_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listings_status ON public.listings USING btree (status);


--
-- Name: idx_listings_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listings_user_id ON public.listings USING btree (user_id);


--
-- Name: idx_listings_year; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_listings_year ON public.listings USING btree (year);


--
-- Name: idx_messages_conversation_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_messages_conversation_id ON public.messages USING btree (conversation_id);


--
-- Name: idx_messages_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_messages_created_at ON public.messages USING btree (created_at DESC);


--
-- Name: idx_messages_is_read; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_messages_is_read ON public.messages USING btree (is_read) WHERE (is_read = false);


--
-- Name: idx_muted_conversations_conv; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_muted_conversations_conv ON public.muted_conversations USING btree (conversation_id);


--
-- Name: idx_muted_conversations_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_muted_conversations_user ON public.muted_conversations USING btree (user_id);


--
-- Name: idx_notifications_is_read; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_notifications_is_read ON public.notifications USING btree (is_read);


--
-- Name: idx_notifications_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_notifications_user_id ON public.notifications USING btree (user_id);


--
-- Name: idx_offer_messages_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offer_messages_created_at ON public.offer_messages USING btree (created_at DESC);


--
-- Name: idx_offer_messages_offer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offer_messages_offer_id ON public.offer_messages USING btree (offer_id);


--
-- Name: idx_offer_messages_sender_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offer_messages_sender_id ON public.offer_messages USING btree (sender_id);


--
-- Name: idx_offer_notifications_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offer_notifications_created_at ON public.offer_notifications USING btree (created_at DESC);


--
-- Name: idx_offer_notifications_is_read; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offer_notifications_is_read ON public.offer_notifications USING btree (is_read) WHERE (is_read = false);


--
-- Name: idx_offer_notifications_offer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offer_notifications_offer_id ON public.offer_notifications USING btree (offer_id);


--
-- Name: idx_offer_notifications_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offer_notifications_user_id ON public.offer_notifications USING btree (user_id);


--
-- Name: idx_offer_typing_offer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offer_typing_offer_id ON public.offer_typing_indicators USING btree (offer_id);


--
-- Name: idx_offer_typing_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offer_typing_user_id ON public.offer_typing_indicators USING btree (user_id);


--
-- Name: idx_offers_buyer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offers_buyer_id ON public.offers USING btree (buyer_id);


--
-- Name: idx_offers_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offers_created_at ON public.offers USING btree (created_at DESC);


--
-- Name: idx_offers_expires_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offers_expires_at ON public.offers USING btree (expires_at) WHERE (expires_at IS NOT NULL);


--
-- Name: idx_offers_listing_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offers_listing_id ON public.offers USING btree (listing_id);


--
-- Name: idx_offers_seller_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offers_seller_id ON public.offers USING btree (seller_id);


--
-- Name: idx_offers_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_offers_status ON public.offers USING btree (status);


--
-- Name: idx_payments_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_payments_created_at ON public.payments USING btree (created_at DESC);


--
-- Name: idx_payments_provider_payment_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_payments_provider_payment_id ON public.payments USING btree (provider_payment_id);


--
-- Name: idx_payments_purchase_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_payments_purchase_id ON public.payments USING btree (purchase_id);


--
-- Name: idx_payments_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_payments_status ON public.payments USING btree (status);


--
-- Name: idx_payments_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_payments_user_id ON public.payments USING btree (user_id);


--
-- Name: idx_phone_otps_expires; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_phone_otps_expires ON public.phone_otps USING btree (expires_at);


--
-- Name: idx_phone_otps_phone; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_phone_otps_phone ON public.phone_otps USING btree (phone_number);


--
-- Name: idx_phone_otps_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_phone_otps_user_id ON public.phone_otps USING btree (user_id);


--
-- Name: idx_price_alerts_is_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_price_alerts_is_active ON public.price_alerts USING btree (is_active) WHERE (is_active = true);


--
-- Name: idx_price_alerts_listing_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_price_alerts_listing_id ON public.price_alerts USING btree (listing_id);


--
-- Name: idx_price_alerts_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_price_alerts_user_id ON public.price_alerts USING btree (user_id);


--
-- Name: idx_price_alerts_vehicle_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_price_alerts_vehicle_id ON public.price_alerts USING btree (vehicle_id);


--
-- Name: idx_promo_code_usage_code; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_promo_code_usage_code ON public.promo_code_usage USING btree (promo_code_id);


--
-- Name: idx_promo_code_usage_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_promo_code_usage_user ON public.promo_code_usage USING btree (user_id);


--
-- Name: idx_promo_codes_code; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_promo_codes_code ON public.promo_codes USING btree (code);


--
-- Name: idx_promo_codes_is_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_promo_codes_is_active ON public.promo_codes USING btree (is_active) WHERE (is_active = true);


--
-- Name: idx_purchases_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_purchases_created_at ON public.purchases USING btree (created_at DESC);


--
-- Name: idx_purchases_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_purchases_status ON public.purchases USING btree (status);


--
-- Name: idx_purchases_transaction_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_purchases_transaction_id ON public.purchases USING btree (transaction_id);


--
-- Name: idx_purchases_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_purchases_type ON public.purchases USING btree (type);


--
-- Name: idx_purchases_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_purchases_user_id ON public.purchases USING btree (user_id);


--
-- Name: idx_recently_viewed_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recently_viewed_user_id ON public.recently_viewed USING btree (user_id);


--
-- Name: idx_recently_viewed_viewed_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_recently_viewed_viewed_at ON public.recently_viewed USING btree (viewed_at DESC);


--
-- Name: idx_refund_requests_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_refund_requests_created ON public.refund_requests USING btree (created_at DESC);


--
-- Name: idx_refund_requests_purchase_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_refund_requests_purchase_id ON public.refund_requests USING btree (purchase_id);


--
-- Name: idx_refund_requests_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_refund_requests_status ON public.refund_requests USING btree (status);


--
-- Name: idx_refund_requests_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_refund_requests_user_id ON public.refund_requests USING btree (user_id);


--
-- Name: idx_saved_searches_notifications_enabled; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_saved_searches_notifications_enabled ON public.saved_searches USING btree (notifications_enabled) WHERE (notifications_enabled = true);


--
-- Name: idx_saved_searches_notify; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_saved_searches_notify ON public.saved_searches USING btree (notify_enabled) WHERE (notify_enabled = true);


--
-- Name: idx_saved_searches_notify_enabled; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_saved_searches_notify_enabled ON public.saved_searches USING btree (notify_enabled) WHERE (notify_enabled = true);


--
-- Name: idx_saved_searches_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_saved_searches_user_id ON public.saved_searches USING btree (user_id);


--
-- Name: idx_scheduled_actions_admin; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_scheduled_actions_admin ON public.scheduled_admin_actions USING btree (admin_id);


--
-- Name: idx_scheduled_actions_scheduled; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_scheduled_actions_scheduled ON public.scheduled_admin_actions USING btree (scheduled_for);


--
-- Name: idx_scheduled_actions_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_scheduled_actions_status ON public.scheduled_admin_actions USING btree (status);


--
-- Name: idx_scheduled_actions_target; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_scheduled_actions_target ON public.scheduled_admin_actions USING btree (target_type, target_id);


--
-- Name: idx_search_cache_expires; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_search_cache_expires ON public.search_cache USING btree (expires_at);


--
-- Name: idx_search_cache_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_search_cache_key ON public.search_cache USING btree (cache_key);


--
-- Name: idx_search_history_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_search_history_created_at ON public.search_history USING btree (created_at DESC);


--
-- Name: idx_search_history_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_search_history_user_id ON public.search_history USING btree (user_id);


--
-- Name: idx_subscription_events_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_subscription_events_created ON public.subscription_events USING btree (created_at DESC);


--
-- Name: idx_subscription_events_sub_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_subscription_events_sub_id ON public.subscription_events USING btree (subscription_id);


--
-- Name: idx_subscription_events_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_subscription_events_type ON public.subscription_events USING btree (event_type);


--
-- Name: idx_subscription_events_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_subscription_events_user_id ON public.subscription_events USING btree (user_id);


--
-- Name: idx_test_drives_listing_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_test_drives_listing_id ON public.test_drive_bookings USING btree (listing_id);


--
-- Name: idx_test_drives_scheduled; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_test_drives_scheduled ON public.test_drive_bookings USING btree (scheduled_date, scheduled_time);


--
-- Name: idx_test_drives_seller_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_test_drives_seller_id ON public.test_drive_bookings USING btree (seller_id);


--
-- Name: idx_test_drives_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_test_drives_status ON public.test_drive_bookings USING btree (status);


--
-- Name: idx_test_drives_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_test_drives_user_id ON public.test_drive_bookings USING btree (user_id);


--
-- Name: idx_test_drives_vehicle_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_test_drives_vehicle_id ON public.test_drive_bookings USING btree (vehicle_id);


--
-- Name: idx_two_factor_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_two_factor_user_id ON public.two_factor_auth USING btree (user_id);


--
-- Name: idx_user_bans_expires_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_bans_expires_at ON public.user_bans USING btree (expires_at);


--
-- Name: idx_user_bans_is_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_bans_is_active ON public.user_bans USING btree (is_active) WHERE (is_active = true);


--
-- Name: idx_user_bans_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_bans_user_id ON public.user_bans USING btree (user_id);


--
-- Name: idx_user_preferences_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_preferences_user_id ON public.user_preferences USING btree (user_id);


--
-- Name: idx_user_reports_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_reports_created ON public.user_reports USING btree (created_at DESC);


--
-- Name: idx_user_reports_reported; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_reports_reported ON public.user_reports USING btree (reported_user_id);


--
-- Name: idx_user_reports_reporter; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_reports_reporter ON public.user_reports USING btree (reporter_id);


--
-- Name: idx_user_reports_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_reports_status ON public.user_reports USING btree (status);


--
-- Name: idx_user_sessions_last_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_sessions_last_active ON public.user_sessions USING btree (last_active_at DESC);


--
-- Name: idx_user_sessions_token; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_sessions_token ON public.user_sessions USING btree (session_token);


--
-- Name: idx_user_sessions_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_sessions_user_id ON public.user_sessions USING btree (user_id);


--
-- Name: idx_user_verifications_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_verifications_status ON public.user_verifications USING btree (status);


--
-- Name: idx_user_verifications_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_verifications_type ON public.user_verifications USING btree (type);


--
-- Name: idx_user_verifications_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_verifications_user_id ON public.user_verifications USING btree (user_id);


--
-- Name: idx_users_dealer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_dealer_id ON public.users USING btree (dealer_id);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- Name: idx_users_is_dealer; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_is_dealer ON public.users USING btree (is_dealer) WHERE (is_dealer = true);


--
-- Name: idx_users_phone; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_phone ON public.users USING btree (phone);


--
-- Name: idx_users_subscription_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_subscription_status ON public.users USING btree (subscription_status);


--
-- Name: idx_vehicle_inquiries_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicle_inquiries_created_at ON public.vehicle_inquiries USING btree (created_at DESC);


--
-- Name: idx_vehicle_inquiries_listing_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicle_inquiries_listing_id ON public.vehicle_inquiries USING btree (listing_id);


--
-- Name: idx_vehicle_inquiries_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicle_inquiries_status ON public.vehicle_inquiries USING btree (status);


--
-- Name: idx_vehicle_inquiries_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicle_inquiries_user_id ON public.vehicle_inquiries USING btree (user_id);


--
-- Name: idx_vehicle_inquiries_vehicle_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicle_inquiries_vehicle_id ON public.vehicle_inquiries USING btree (vehicle_id);


--
-- Name: idx_vehicle_views_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicle_views_created_at ON public.vehicle_views USING btree (created_at DESC);


--
-- Name: idx_vehicle_views_listing_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicle_views_listing_id ON public.vehicle_views USING btree (listing_id);


--
-- Name: idx_vehicle_views_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicle_views_user_id ON public.vehicle_views USING btree (user_id);


--
-- Name: idx_vehicle_views_vehicle_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicle_views_vehicle_id ON public.vehicle_views USING btree (vehicle_id);


--
-- Name: idx_vehicle_views_viewed_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicle_views_viewed_at ON public.vehicle_views USING btree (viewed_at DESC);


--
-- Name: idx_vehicles_body_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_body_type ON public.vehicles USING btree (body_type);


--
-- Name: idx_vehicles_boost_expires_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_boost_expires_at ON public.vehicles USING btree (boost_expires_at) WHERE (boost_expires_at IS NOT NULL);


--
-- Name: idx_vehicles_city; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_city ON public.vehicles USING btree (city);


--
-- Name: idx_vehicles_condition; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_condition ON public.vehicles USING btree (condition);


--
-- Name: idx_vehicles_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_created_at ON public.vehicles USING btree (created_at DESC);


--
-- Name: idx_vehicles_dealer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_dealer_id ON public.vehicles USING btree (dealer_id);


--
-- Name: idx_vehicles_fuel_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_fuel_type ON public.vehicles USING btree (fuel_type);


--
-- Name: idx_vehicles_is_boosted; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_is_boosted ON public.vehicles USING btree (is_boosted) WHERE (is_boosted = true);


--
-- Name: idx_vehicles_is_featured_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_is_featured_created ON public.vehicles USING btree (is_featured DESC, created_at DESC);


--
-- Name: idx_vehicles_location; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_location ON public.vehicles USING btree (city, state);


--
-- Name: idx_vehicles_make; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_make ON public.vehicles USING btree (make);


--
-- Name: idx_vehicles_make_model; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_make_model ON public.vehicles USING btree (make, model);


--
-- Name: idx_vehicles_model; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_model ON public.vehicles USING btree (model);


--
-- Name: idx_vehicles_price; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_price ON public.vehicles USING btree (price);


--
-- Name: idx_vehicles_price_year; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_price_year ON public.vehicles USING btree (price, year);


--
-- Name: idx_vehicles_search_vector; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_search_vector ON public.vehicles USING gin (search_vector);


--
-- Name: idx_vehicles_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_status ON public.vehicles USING btree (status);


--
-- Name: idx_vehicles_status_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_status_created ON public.vehicles USING btree (status, created_at DESC);


--
-- Name: idx_vehicles_transmission; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_transmission ON public.vehicles USING btree (transmission);


--
-- Name: idx_vehicles_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_user_id ON public.vehicles USING btree (user_id);


--
-- Name: idx_vehicles_year; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vehicles_year ON public.vehicles USING btree (year);


--
-- Name: idx_video_thumbnails_listing_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_video_thumbnails_listing_id ON public.video_thumbnails USING btree (listing_id);


--
-- Name: idx_video_thumbnails_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_video_thumbnails_status ON public.video_thumbnails USING btree (status);


--
-- Name: idx_video_thumbnails_vehicle_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_video_thumbnails_vehicle_id ON public.video_thumbnails USING btree (vehicle_id);


--
-- Name: idx_vin_cache_expires; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vin_cache_expires ON public.vin_report_cache USING btree (expires_at);


--
-- Name: idx_vin_cache_vin; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vin_cache_vin ON public.vin_report_cache USING btree (vin);


--
-- Name: idx_vin_purchases_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vin_purchases_status ON public.vin_report_purchases USING btree (status);


--
-- Name: idx_vin_purchases_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vin_purchases_user_id ON public.vin_report_purchases USING btree (user_id);


--
-- Name: idx_vin_purchases_vin; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vin_purchases_vin ON public.vin_report_purchases USING btree (vin);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: buckets_analytics_unique_name_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX buckets_analytics_unique_name_idx ON storage.buckets_analytics USING btree (name) WHERE (deleted_at IS NULL);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_name_bucket_level_unique; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX idx_name_bucket_level_unique ON storage.objects USING btree (name COLLATE "C", bucket_id, level);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_lower_name ON storage.objects USING btree ((path_tokens[level]), lower(name) text_pattern_ops, bucket_id, level);


--
-- Name: idx_prefixes_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_prefixes_lower_name ON storage.prefixes USING btree (bucket_id, level, ((string_to_array(name, '/'::text))[level]), lower(name) text_pattern_ops);


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: objects_bucket_id_level_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX objects_bucket_id_level_idx ON storage.objects USING btree (bucket_id, level, name COLLATE "C");


--
-- Name: vector_indexes_name_bucket_id_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX vector_indexes_name_bucket_id_idx ON storage.vector_indexes USING btree (name, bucket_id);


--
-- Name: users on_auth_user_created; Type: TRIGGER; Schema: auth; Owner: supabase_auth_admin
--

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


--
-- Name: ab_tests update_ab_tests_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_ab_tests_updated_at BEFORE UPDATE ON public.ab_tests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: admin_roles update_admin_roles_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_admin_roles_updated_at BEFORE UPDATE ON public.admin_roles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: admin_users update_admin_users_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: conversations update_conversations_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON public.conversations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: dealers update_dealers_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_dealers_updated_at BEFORE UPDATE ON public.dealers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: favorites update_favorites_count; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_favorites_count AFTER INSERT OR DELETE ON public.favorites FOR EACH ROW EXECUTE FUNCTION public.increment_favorites_count();


--
-- Name: inspections update_inspections_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_inspections_updated_at BEFORE UPDATE ON public.inspections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: inspectors update_inspectors_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_inspectors_updated_at BEFORE UPDATE ON public.inspectors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: listing_reports update_listing_reports_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_listing_reports_updated_at BEFORE UPDATE ON public.listing_reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: listings update_listings_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON public.listings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: offer_typing_indicators update_offer_typing_indicators_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_offer_typing_indicators_updated_at BEFORE UPDATE ON public.offer_typing_indicators FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: offers update_offers_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON public.offers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: payments update_payments_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: price_alerts update_price_alerts_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_price_alerts_updated_at BEFORE UPDATE ON public.price_alerts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: promo_codes update_promo_codes_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_promo_codes_updated_at BEFORE UPDATE ON public.promo_codes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: promo_code_usage update_promo_usage; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_promo_usage AFTER INSERT ON public.promo_code_usage FOR EACH ROW EXECUTE FUNCTION public.update_promo_usage_count();


--
-- Name: purchases update_purchases_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON public.purchases FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: push_tokens update_push_tokens_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_push_tokens_updated_at BEFORE UPDATE ON public.push_tokens FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: refund_requests update_refund_requests_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_refund_requests_updated_at BEFORE UPDATE ON public.refund_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: reviews update_reviews_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: saved_searches update_saved_searches_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_saved_searches_updated_at BEFORE UPDATE ON public.saved_searches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: scheduled_admin_actions update_scheduled_admin_actions_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_scheduled_admin_actions_updated_at BEFORE UPDATE ON public.scheduled_admin_actions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: site_settings update_site_settings_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: subscriptions update_subscriptions_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: test_drive_bookings update_test_drive_bookings_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_test_drive_bookings_updated_at BEFORE UPDATE ON public.test_drive_bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: two_factor_auth update_two_factor_auth_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_two_factor_auth_updated_at BEFORE UPDATE ON public.two_factor_auth FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: typing_indicators update_typing_indicators_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_typing_indicators_updated_at BEFORE UPDATE ON public.typing_indicators FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: user_bans update_user_bans_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_user_bans_updated_at BEFORE UPDATE ON public.user_bans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: user_preferences update_user_preferences_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: user_reports update_user_reports_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_user_reports_updated_at BEFORE UPDATE ON public.user_reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: user_verifications update_user_verifications_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_user_verifications_updated_at BEFORE UPDATE ON public.user_verifications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: users update_users_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: vehicle_inquiries update_vehicle_inquiries_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_vehicle_inquiries_updated_at BEFORE UPDATE ON public.vehicle_inquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: vehicles update_vehicles_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: video_thumbnails update_video_thumbnails_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_video_thumbnails_updated_at BEFORE UPDATE ON public.video_thumbnails FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: vehicles vehicle_cache_invalidation_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER vehicle_cache_invalidation_trigger AFTER INSERT OR DELETE OR UPDATE ON public.vehicles FOR EACH STATEMENT EXECUTE FUNCTION public.invalidate_search_cache();


--
-- Name: vehicles vehicle_saved_search_notify_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER vehicle_saved_search_notify_trigger AFTER INSERT ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.notify_saved_search_matches();


--
-- Name: vehicles vehicle_saved_search_notify_update_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER vehicle_saved_search_notify_update_trigger AFTER UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.notify_saved_search_matches_on_update();


--
-- Name: vehicles vehicle_search_vector_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER vehicle_search_vector_trigger BEFORE INSERT OR UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.update_vehicle_search_vector();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: objects objects_delete_delete_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_delete_delete_prefix AFTER DELETE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects objects_insert_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_insert_create_prefix BEFORE INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.objects_insert_prefix_trigger();


--
-- Name: objects objects_update_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_update_create_prefix BEFORE UPDATE ON storage.objects FOR EACH ROW WHEN (((new.name <> old.name) OR (new.bucket_id <> old.bucket_id))) EXECUTE FUNCTION storage.objects_update_prefix_trigger();


--
-- Name: prefixes prefixes_create_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_create_hierarchy BEFORE INSERT ON storage.prefixes FOR EACH ROW WHEN ((pg_trigger_depth() < 1)) EXECUTE FUNCTION storage.prefixes_insert_trigger();


--
-- Name: prefixes prefixes_delete_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_delete_hierarchy AFTER DELETE ON storage.prefixes FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: ab_test_assignments ab_test_assignments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ab_test_assignments
    ADD CONSTRAINT ab_test_assignments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: ab_tests ab_tests_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ab_tests
    ADD CONSTRAINT ab_tests_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: admin_activity_log admin_activity_log_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_activity_log
    ADD CONSTRAINT admin_activity_log_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: admin_users admin_users_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id);


--
-- Name: admin_users admin_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: analytics_events analytics_events_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analytics_events
    ADD CONSTRAINT analytics_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: contact_messages contact_messages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_messages
    ADD CONSTRAINT contact_messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE SET NULL;


--
-- Name: conversations conversations_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: conversations conversations_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE SET NULL;


--
-- Name: conversations conversations_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: dealers dealers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dealers
    ADD CONSTRAINT dealers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: deleted_conversations deleted_conversations_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deleted_conversations
    ADD CONSTRAINT deleted_conversations_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;


--
-- Name: deleted_conversations deleted_conversations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deleted_conversations
    ADD CONSTRAINT deleted_conversations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: favorites favorites_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: favorites favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: inspections inspections_inspector_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_inspector_id_fkey FOREIGN KEY (inspector_id) REFERENCES public.inspectors(id) ON DELETE SET NULL;


--
-- Name: inspections inspections_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE SET NULL;


--
-- Name: inspections inspections_purchase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_purchase_id_fkey FOREIGN KEY (purchase_id) REFERENCES public.purchases(id) ON DELETE SET NULL;


--
-- Name: inspections inspections_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: inspections inspections_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE SET NULL;


--
-- Name: inspectors inspectors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspectors
    ADD CONSTRAINT inspectors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: linked_accounts linked_accounts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.linked_accounts
    ADD CONSTRAINT linked_accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: listing_boosts listing_boosts_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing_boosts
    ADD CONSTRAINT listing_boosts_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: listing_boosts listing_boosts_purchase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing_boosts
    ADD CONSTRAINT listing_boosts_purchase_id_fkey FOREIGN KEY (purchase_id) REFERENCES public.purchases(id) ON DELETE SET NULL;


--
-- Name: listing_boosts listing_boosts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing_boosts
    ADD CONSTRAINT listing_boosts_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: listing_boosts listing_boosts_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing_boosts
    ADD CONSTRAINT listing_boosts_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE CASCADE;


--
-- Name: listing_reports listing_reports_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing_reports
    ADD CONSTRAINT listing_reports_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: listing_reports listing_reports_reporter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing_reports
    ADD CONSTRAINT listing_reports_reporter_id_fkey FOREIGN KEY (reporter_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: listing_reports listing_reports_reviewed_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing_reports
    ADD CONSTRAINT listing_reports_reviewed_by_fkey FOREIGN KEY (reviewed_by) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: listing_reports listing_reports_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing_reports
    ADD CONSTRAINT listing_reports_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE CASCADE;


--
-- Name: listings listings_dealer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_dealer_id_fkey FOREIGN KEY (dealer_id) REFERENCES public.dealers(id) ON DELETE SET NULL;


--
-- Name: listings listings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: messages messages_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;


--
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: muted_conversations muted_conversations_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.muted_conversations
    ADD CONSTRAINT muted_conversations_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;


--
-- Name: muted_conversations muted_conversations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.muted_conversations
    ADD CONSTRAINT muted_conversations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: offer_messages offer_messages_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_messages
    ADD CONSTRAINT offer_messages_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(id) ON DELETE CASCADE;


--
-- Name: offer_messages offer_messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_messages
    ADD CONSTRAINT offer_messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: offer_notifications offer_notifications_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_notifications
    ADD CONSTRAINT offer_notifications_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(id) ON DELETE CASCADE;


--
-- Name: offer_notifications offer_notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_notifications
    ADD CONSTRAINT offer_notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: offer_typing_indicators offer_typing_indicators_offer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_typing_indicators
    ADD CONSTRAINT offer_typing_indicators_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(id) ON DELETE CASCADE;


--
-- Name: offer_typing_indicators offer_typing_indicators_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_typing_indicators
    ADD CONSTRAINT offer_typing_indicators_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: offers offers_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: offers offers_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: offers offers_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: payments payments_purchase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_purchase_id_fkey FOREIGN KEY (purchase_id) REFERENCES public.purchases(id) ON DELETE SET NULL;


--
-- Name: payments payments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: phone_otps phone_otps_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phone_otps
    ADD CONSTRAINT phone_otps_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: price_alerts price_alerts_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.price_alerts
    ADD CONSTRAINT price_alerts_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: price_alerts price_alerts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.price_alerts
    ADD CONSTRAINT price_alerts_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: price_alerts price_alerts_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.price_alerts
    ADD CONSTRAINT price_alerts_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: promo_code_usage promo_code_usage_promo_code_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promo_code_usage
    ADD CONSTRAINT promo_code_usage_promo_code_id_fkey FOREIGN KEY (promo_code_id) REFERENCES public.promo_codes(id) ON DELETE CASCADE;


--
-- Name: promo_code_usage promo_code_usage_purchase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promo_code_usage
    ADD CONSTRAINT promo_code_usage_purchase_id_fkey FOREIGN KEY (purchase_id) REFERENCES public.purchases(id) ON DELETE SET NULL;


--
-- Name: promo_code_usage promo_code_usage_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promo_code_usage
    ADD CONSTRAINT promo_code_usage_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: promo_codes promo_codes_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promo_codes
    ADD CONSTRAINT promo_codes_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: purchases purchases_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES auth.users(id);


--
-- Name: purchases purchases_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES auth.users(id);


--
-- Name: purchases purchases_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: push_tokens push_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.push_tokens
    ADD CONSTRAINT push_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: recently_viewed recently_viewed_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recently_viewed
    ADD CONSTRAINT recently_viewed_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: recently_viewed recently_viewed_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recently_viewed
    ADD CONSTRAINT recently_viewed_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: refund_requests refund_requests_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refund_requests
    ADD CONSTRAINT refund_requests_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payments(id) ON DELETE SET NULL;


--
-- Name: refund_requests refund_requests_purchase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refund_requests
    ADD CONSTRAINT refund_requests_purchase_id_fkey FOREIGN KEY (purchase_id) REFERENCES public.purchases(id) ON DELETE CASCADE;


--
-- Name: refund_requests refund_requests_reviewed_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refund_requests
    ADD CONSTRAINT refund_requests_reviewed_by_fkey FOREIGN KEY (reviewed_by) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: refund_requests refund_requests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refund_requests
    ADD CONSTRAINT refund_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE SET NULL;


--
-- Name: reviews reviews_reviewed_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_reviewed_user_id_fkey FOREIGN KEY (reviewed_user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_reviewee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_reviewee_id_fkey FOREIGN KEY (reviewee_id) REFERENCES auth.users(id);


--
-- Name: reviews reviews_reviewer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_reviewer_id_fkey FOREIGN KEY (reviewer_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: saved_searches saved_searches_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_searches
    ADD CONSTRAINT saved_searches_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: scheduled_admin_actions scheduled_admin_actions_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scheduled_admin_actions
    ADD CONSTRAINT scheduled_admin_actions_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: scheduled_admin_actions scheduled_admin_actions_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scheduled_admin_actions
    ADD CONSTRAINT scheduled_admin_actions_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id);


--
-- Name: search_history search_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_history
    ADD CONSTRAINT search_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: site_settings site_settings_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: subscription_events subscription_events_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscription_events
    ADD CONSTRAINT subscription_events_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id) ON DELETE CASCADE;


--
-- Name: subscription_events subscription_events_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscription_events
    ADD CONSTRAINT subscription_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: subscriptions subscriptions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: test_drive_bookings test_drive_bookings_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_drive_bookings
    ADD CONSTRAINT test_drive_bookings_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES auth.users(id);


--
-- Name: test_drive_bookings test_drive_bookings_cancelled_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_drive_bookings
    ADD CONSTRAINT test_drive_bookings_cancelled_by_fkey FOREIGN KEY (cancelled_by) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: test_drive_bookings test_drive_bookings_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_drive_bookings
    ADD CONSTRAINT test_drive_bookings_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: test_drive_bookings test_drive_bookings_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_drive_bookings
    ADD CONSTRAINT test_drive_bookings_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: test_drive_bookings test_drive_bookings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_drive_bookings
    ADD CONSTRAINT test_drive_bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: test_drive_bookings test_drive_bookings_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_drive_bookings
    ADD CONSTRAINT test_drive_bookings_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE CASCADE;


--
-- Name: two_factor_auth two_factor_auth_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.two_factor_auth
    ADD CONSTRAINT two_factor_auth_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: typing_indicators typing_indicators_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.typing_indicators
    ADD CONSTRAINT typing_indicators_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;


--
-- Name: typing_indicators typing_indicators_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.typing_indicators
    ADD CONSTRAINT typing_indicators_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: user_bans user_bans_banned_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_bans
    ADD CONSTRAINT user_bans_banned_by_fkey FOREIGN KEY (banned_by) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: user_bans user_bans_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_bans
    ADD CONSTRAINT user_bans_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_preferences user_preferences_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_reports user_reports_reported_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_reports
    ADD CONSTRAINT user_reports_reported_user_id_fkey FOREIGN KEY (reported_user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_reports user_reports_reporter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_reports
    ADD CONSTRAINT user_reports_reporter_id_fkey FOREIGN KEY (reporter_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_reports user_reports_reviewed_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_reports
    ADD CONSTRAINT user_reports_reviewed_by_fkey FOREIGN KEY (reviewed_by) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: user_sessions user_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_verifications user_verifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_verifications
    ADD CONSTRAINT user_verifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_verifications user_verifications_verified_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_verifications
    ADD CONSTRAINT user_verifications_verified_by_fkey FOREIGN KEY (verified_by) REFERENCES auth.users(id);


--
-- Name: users users_dealer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_dealer_id_fkey FOREIGN KEY (dealer_id) REFERENCES public.dealers(id) ON DELETE SET NULL;


--
-- Name: users users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: vehicle_inquiries vehicle_inquiries_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_inquiries
    ADD CONSTRAINT vehicle_inquiries_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: vehicle_inquiries vehicle_inquiries_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_inquiries
    ADD CONSTRAINT vehicle_inquiries_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: vehicle_inquiries vehicle_inquiries_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_inquiries
    ADD CONSTRAINT vehicle_inquiries_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE CASCADE;


--
-- Name: vehicle_views vehicle_views_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_views
    ADD CONSTRAINT vehicle_views_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: vehicle_views vehicle_views_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_views
    ADD CONSTRAINT vehicle_views_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;


--
-- Name: vehicle_views vehicle_views_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_views
    ADD CONSTRAINT vehicle_views_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE CASCADE;


--
-- Name: vehicles vehicles_dealer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_dealer_id_fkey FOREIGN KEY (dealer_id) REFERENCES public.dealers(id) ON DELETE SET NULL;


--
-- Name: vehicles vehicles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: video_thumbnails video_thumbnails_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_thumbnails
    ADD CONSTRAINT video_thumbnails_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;


--
-- Name: video_thumbnails video_thumbnails_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_thumbnails
    ADD CONSTRAINT video_thumbnails_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE CASCADE;


--
-- Name: vin_report_purchases vin_report_purchases_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vin_report_purchases
    ADD CONSTRAINT vin_report_purchases_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE SET NULL;


--
-- Name: vin_report_purchases vin_report_purchases_purchase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vin_report_purchases
    ADD CONSTRAINT vin_report_purchases_purchase_id_fkey FOREIGN KEY (purchase_id) REFERENCES public.purchases(id) ON DELETE SET NULL;


--
-- Name: vin_report_purchases vin_report_purchases_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vin_report_purchases
    ADD CONSTRAINT vin_report_purchases_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: vin_report_purchases vin_report_purchases_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vin_report_purchases
    ADD CONSTRAINT vin_report_purchases_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE SET NULL;


--
-- Name: vin_reports vin_reports_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vin_reports
    ADD CONSTRAINT vin_reports_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE SET NULL;


--
-- Name: vin_reports vin_reports_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vin_reports
    ADD CONSTRAINT vin_reports_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: prefixes prefixes_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT "prefixes_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: vector_indexes vector_indexes_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets_vectors(id);


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: listings Active listings are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Active listings are viewable by everyone" ON public.listings FOR SELECT USING (((status = 'active'::text) OR (auth.uid() = user_id)));


--
-- Name: admin_activity_log Admins can insert activity log; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can insert activity log" ON public.admin_activity_log FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: user_bans Admins can manage bans; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can manage bans" ON public.user_bans USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: inspectors Admins can manage inspectors; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can manage inspectors" ON public.inspectors USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: listing_reports Admins can manage listing reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can manage listing reports" ON public.listing_reports USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: promo_codes Admins can manage promo codes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can manage promo codes" ON public.promo_codes USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: refund_requests Admins can manage refund requests; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can manage refund requests" ON public.refund_requests USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: user_reports Admins can manage reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can manage reports" ON public.user_reports USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: scheduled_admin_actions Admins can manage scheduled actions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can manage scheduled actions" ON public.scheduled_admin_actions USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: site_settings Admins can manage settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can manage settings" ON public.site_settings USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: ab_tests Admins can manage tests; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can manage tests" ON public.ab_tests USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: admin_activity_log Admins can view activity log; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view activity log" ON public.admin_activity_log FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: admin_users Admins can view admin users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view admin users" ON public.admin_users FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.admin_users admin_users_1
  WHERE (admin_users_1.user_id = auth.uid()))));


--
-- Name: ab_test_assignments Admins can view all assignments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view all assignments" ON public.ab_test_assignments FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: listing_boosts Admins can view all boosts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view all boosts" ON public.listing_boosts FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: subscription_events Admins can view all events; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view all events" ON public.subscription_events FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: payments Admins can view all payments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view all payments" ON public.payments FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: purchases Admins can view all purchases; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view all purchases" ON public.purchases FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: site_settings Admins can view all settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view all settings" ON public.site_settings FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: analytics_events Admins can view analytics; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view analytics" ON public.analytics_events FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: admin_roles Admins can view roles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view roles" ON public.admin_roles FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE (admin_users.user_id = auth.uid()))));


--
-- Name: phone_otps Anyone can create OTPs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can create OTPs" ON public.phone_otps FOR INSERT WITH CHECK (true);


--
-- Name: vehicle_inquiries Anyone can create inquiries; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can create inquiries" ON public.vehicle_inquiries FOR INSERT WITH CHECK (true);


--
-- Name: analytics_events Anyone can insert analytics; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can insert analytics" ON public.analytics_events FOR INSERT WITH CHECK (true);


--
-- Name: vehicle_views Anyone can insert views; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can insert views" ON public.vehicle_views FOR INSERT WITH CHECK (true);


--
-- Name: contact_messages Anyone can submit contact messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);


--
-- Name: inspectors Anyone can view active inspectors; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view active inspectors" ON public.inspectors FOR SELECT USING ((is_active = true));


--
-- Name: listings Anyone can view active listings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view active listings" ON public.listings FOR SELECT USING (((status = 'active'::text) OR (auth.uid() = user_id)));


--
-- Name: promo_codes Anyone can view active promo codes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view active promo codes" ON public.promo_codes FOR SELECT USING ((is_active = true));


--
-- Name: vehicles Anyone can view active vehicles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view active vehicles" ON public.vehicles FOR SELECT USING (((status = 'active'::text) OR (auth.uid() = user_id)));


--
-- Name: site_settings Anyone can view public settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view public settings" ON public.site_settings FOR SELECT USING ((is_public = true));


--
-- Name: reviews Anyone can view reviews; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);


--
-- Name: dealers Anyone can view verified dealers; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view verified dealers" ON public.dealers FOR SELECT USING (((is_verified = true) OR (auth.uid() = user_id)));


--
-- Name: video_thumbnails Anyone can view video thumbnails; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view video thumbnails" ON public.video_thumbnails FOR SELECT USING (true);


--
-- Name: vin_report_cache Authenticated users can view cached reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can view cached reports" ON public.vin_report_cache FOR SELECT USING ((auth.role() = 'authenticated'::text));


--
-- Name: messages Conversation participants can send messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Conversation participants can send messages" ON public.messages FOR INSERT WITH CHECK (((auth.uid() = sender_id) AND (EXISTS ( SELECT 1
   FROM public.conversations
  WHERE ((conversations.id = messages.conversation_id) AND ((conversations.buyer_id = auth.uid()) OR (conversations.seller_id = auth.uid())))))));


--
-- Name: messages Conversation participants can view messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Conversation participants can view messages" ON public.messages FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.conversations
  WHERE ((conversations.id = messages.conversation_id) AND ((conversations.buyer_id = auth.uid()) OR (conversations.seller_id = auth.uid()))))));


--
-- Name: typing_indicators Conversation participants can view typing; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Conversation participants can view typing" ON public.typing_indicators FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.conversations
  WHERE ((conversations.id = typing_indicators.conversation_id) AND ((conversations.buyer_id = auth.uid()) OR (conversations.seller_id = auth.uid()))))));


--
-- Name: dealers Dealers are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Dealers are viewable by everyone" ON public.dealers FOR SELECT USING (true);


--
-- Name: dealers Dealers can update own record; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Dealers can update own record" ON public.dealers FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: inspections Inspectors can view assigned inspections; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Inspectors can view assigned inspections" ON public.inspections FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.inspectors i
  WHERE ((i.id = inspections.inspector_id) AND (i.email = auth.email())))));


--
-- Name: offer_messages Offer participants can send messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Offer participants can send messages" ON public.offer_messages FOR INSERT WITH CHECK (((auth.uid() = sender_id) AND (EXISTS ( SELECT 1
   FROM public.offers o
  WHERE ((o.id = offer_messages.offer_id) AND ((o.buyer_id = auth.uid()) OR (o.seller_id = auth.uid())))))));


--
-- Name: offer_messages Offer participants can view messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Offer participants can view messages" ON public.offer_messages FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.offers o
  WHERE ((o.id = offer_messages.offer_id) AND ((o.buyer_id = auth.uid()) OR (o.seller_id = auth.uid()))))));


--
-- Name: offer_typing_indicators Offer participants can view typing; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Offer participants can view typing" ON public.offer_typing_indicators FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.offers o
  WHERE ((o.id = offer_typing_indicators.offer_id) AND ((o.buyer_id = auth.uid()) OR (o.seller_id = auth.uid()))))));


--
-- Name: test_drive_bookings Participants can update bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Participants can update bookings" ON public.test_drive_bookings FOR UPDATE USING (((auth.uid() = user_id) OR (auth.uid() = seller_id)));


--
-- Name: conversations Participants can update conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Participants can update conversations" ON public.conversations FOR UPDATE USING (((auth.uid() = buyer_id) OR (auth.uid() = seller_id)));


--
-- Name: offers Participants can update offers; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Participants can update offers" ON public.offers FOR UPDATE USING (((auth.uid() = buyer_id) OR (auth.uid() = seller_id)));


--
-- Name: profiles Public profiles are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);


--
-- Name: reviews Reviews are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);


--
-- Name: admin_users Super admins can manage admin users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Super admins can manage admin users" ON public.admin_users USING ((EXISTS ( SELECT 1
   FROM public.admin_users admin_users_1
  WHERE ((admin_users_1.user_id = auth.uid()) AND (admin_users_1.role = 'super_admin'::text)))));


--
-- Name: admin_roles Super admins can manage roles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Super admins can manage roles" ON public.admin_roles USING ((EXISTS ( SELECT 1
   FROM public.admin_users
  WHERE ((admin_users.user_id = auth.uid()) AND (admin_users.role = 'super_admin'::text)))));


--
-- Name: ab_test_assignments System can create assignments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "System can create assignments" ON public.ab_test_assignments FOR INSERT WITH CHECK (true);


--
-- Name: notifications System can create notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "System can create notifications" ON public.notifications FOR INSERT WITH CHECK (true);


--
-- Name: offer_notifications System can insert notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "System can insert notifications" ON public.offer_notifications FOR INSERT WITH CHECK (true);


--
-- Name: promo_code_usage System can insert usage; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "System can insert usage" ON public.promo_code_usage FOR INSERT WITH CHECK (true);


--
-- Name: phone_otps System can update OTPs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "System can update OTPs" ON public.phone_otps FOR UPDATE USING (true);


--
-- Name: ab_test_assignments System can update assignments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "System can update assignments" ON public.ab_test_assignments FOR UPDATE USING (true);


--
-- Name: favorites Users can add favorites; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can add favorites" ON public.favorites FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: recently_viewed Users can add to history; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can add to history" ON public.recently_viewed FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: vin_reports Users can create VIN reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create VIN reports" ON public.vin_reports FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: test_drive_bookings Users can create bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create bookings" ON public.test_drive_bookings FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: listing_boosts Users can create boosts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create boosts" ON public.listing_boosts FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: conversations Users can create conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create conversations" ON public.conversations FOR INSERT WITH CHECK ((auth.uid() = buyer_id));


--
-- Name: dealers Users can create dealer profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create dealer profile" ON public.dealers FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: inspections Users can create inspections; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create inspections" ON public.inspections FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: listing_reports Users can create listing reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create listing reports" ON public.listing_reports FOR INSERT WITH CHECK ((auth.uid() = reporter_id));


--
-- Name: listings Users can create listings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create listings" ON public.listings FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: offers Users can create offers; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create offers" ON public.offers FOR INSERT WITH CHECK ((auth.uid() = buyer_id));


--
-- Name: price_alerts Users can create own alerts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create own alerts" ON public.price_alerts FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: user_preferences Users can create own preferences; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create own preferences" ON public.user_preferences FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: refund_requests Users can create refund requests; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create refund requests" ON public.refund_requests FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: user_reports Users can create reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create reports" ON public.user_reports FOR INSERT WITH CHECK ((auth.uid() = reporter_id));


--
-- Name: reviews Users can create reviews; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK ((auth.uid() = reviewer_id));


--
-- Name: saved_searches Users can create saved searches; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create saved searches" ON public.saved_searches FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: search_history Users can create search history; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create search history" ON public.search_history FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: subscriptions Users can create subscriptions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create subscriptions" ON public.subscriptions FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: deleted_conversations Users can delete conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete conversations" ON public.deleted_conversations FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: recently_viewed Users can delete history; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete history" ON public.recently_viewed FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: price_alerts Users can delete own alerts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own alerts" ON public.price_alerts FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: favorites Users can delete own favorites; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own favorites" ON public.favorites FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: listings Users can delete own listings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own listings" ON public.listings FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: notifications Users can delete own notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own notifications" ON public.notifications FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: price_alerts Users can delete own price alerts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own price alerts" ON public.price_alerts FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: push_tokens Users can delete own push tokens; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own push tokens" ON public.push_tokens FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: recently_viewed Users can delete own recently viewed; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own recently viewed" ON public.recently_viewed FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: reviews Users can delete own reviews; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE USING ((auth.uid() = reviewer_id));


--
-- Name: saved_searches Users can delete own saved searches; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own saved searches" ON public.saved_searches FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: search_history Users can delete own search history; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own search history" ON public.search_history FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: user_sessions Users can delete own sessions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own sessions" ON public.user_sessions FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: vehicles Users can delete own vehicles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own vehicles" ON public.vehicles FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: two_factor_auth Users can disable 2FA; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can disable 2FA" ON public.two_factor_auth FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: contact_messages Users can insert contact messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);


--
-- Name: conversations Users can insert conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert conversations" ON public.conversations FOR INSERT WITH CHECK (((auth.uid() = buyer_id) OR (auth.uid() = seller_id)));


--
-- Name: inspections Users can insert inspections; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert inspections" ON public.inspections FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: listing_reports Users can insert listing reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert listing reports" ON public.listing_reports FOR INSERT WITH CHECK ((auth.uid() = reporter_id));


--
-- Name: messages Users can insert messages in their conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert messages in their conversations" ON public.messages FOR INSERT WITH CHECK (((auth.uid() = sender_id) AND (EXISTS ( SELECT 1
   FROM public.conversations c
  WHERE ((c.id = messages.conversation_id) AND ((c.buyer_id = auth.uid()) OR (c.seller_id = auth.uid())))))));


--
-- Name: offer_messages Users can insert offer messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert offer messages" ON public.offer_messages FOR INSERT WITH CHECK (((auth.uid() = sender_id) AND (EXISTS ( SELECT 1
   FROM public.offers o
  WHERE ((o.id = offer_messages.offer_id) AND ((o.buyer_id = auth.uid()) OR (o.seller_id = auth.uid())))))));


--
-- Name: offers Users can insert offers; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert offers" ON public.offers FOR INSERT WITH CHECK ((auth.uid() = buyer_id));


--
-- Name: dealers Users can insert own dealer profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own dealer profile" ON public.dealers FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: favorites Users can insert own favorites; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own favorites" ON public.favorites FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: listing_boosts Users can insert own listing boosts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own listing boosts" ON public.listing_boosts FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: listings Users can insert own listings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own listings" ON public.listings FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: user_preferences Users can insert own preferences; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own preferences" ON public.user_preferences FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: price_alerts Users can insert own price alerts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own price alerts" ON public.price_alerts FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: profiles Users can insert own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = id));


--
-- Name: users Users can insert own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK ((auth.uid() = id));


--
-- Name: purchases Users can insert own purchases; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own purchases" ON public.purchases FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: push_tokens Users can insert own push tokens; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own push tokens" ON public.push_tokens FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: recently_viewed Users can insert own recently viewed; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own recently viewed" ON public.recently_viewed FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: reviews Users can insert own reviews; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own reviews" ON public.reviews FOR INSERT WITH CHECK ((auth.uid() = reviewer_id));


--
-- Name: saved_searches Users can insert own saved searches; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own saved searches" ON public.saved_searches FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: search_history Users can insert own search history; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own search history" ON public.search_history FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: vehicles Users can insert own vehicles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own vehicles" ON public.vehicles FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: user_verifications Users can insert own verifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own verifications" ON public.user_verifications FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: refund_requests Users can insert refund requests; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert refund requests" ON public.refund_requests FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: test_drive_bookings Users can insert test drive bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert test drive bookings" ON public.test_drive_bookings FOR INSERT WITH CHECK ((auth.uid() = buyer_id));


--
-- Name: user_reports Users can insert user reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert user reports" ON public.user_reports FOR INSERT WITH CHECK ((auth.uid() = reporter_id));


--
-- Name: linked_accounts Users can link accounts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can link accounts" ON public.linked_accounts FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: two_factor_auth Users can manage own 2FA settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage own 2FA settings" ON public.two_factor_auth USING ((auth.uid() = user_id));


--
-- Name: deleted_conversations Users can manage own deleted conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage own deleted conversations" ON public.deleted_conversations USING ((auth.uid() = user_id));


--
-- Name: linked_accounts Users can manage own linked accounts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage own linked accounts" ON public.linked_accounts USING ((auth.uid() = user_id));


--
-- Name: muted_conversations Users can manage own muted conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage own muted conversations" ON public.muted_conversations USING ((auth.uid() = user_id));


--
-- Name: push_tokens Users can manage own push tokens; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage own push tokens" ON public.push_tokens USING ((auth.uid() = user_id));


--
-- Name: user_sessions Users can manage own sessions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage own sessions" ON public.user_sessions USING ((auth.uid() = user_id));


--
-- Name: muted_conversations Users can mute conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can mute conversations" ON public.muted_conversations FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: vin_report_purchases Users can purchase VIN reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can purchase VIN reports" ON public.vin_report_purchases FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: favorites Users can remove favorites; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can remove favorites" ON public.favorites FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: deleted_conversations Users can restore conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can restore conversations" ON public.deleted_conversations FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: two_factor_auth Users can setup 2FA; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can setup 2FA" ON public.two_factor_auth FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: linked_accounts Users can unlink accounts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can unlink accounts" ON public.linked_accounts FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: muted_conversations Users can unmute conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can unmute conversations" ON public.muted_conversations FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: two_factor_auth Users can update 2FA; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update 2FA" ON public.two_factor_auth FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: recently_viewed Users can update history; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update history" ON public.recently_viewed FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: muted_conversations Users can update mute settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update mute settings" ON public.muted_conversations FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: price_alerts Users can update own alerts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own alerts" ON public.price_alerts FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: conversations Users can update own conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own conversations" ON public.conversations FOR UPDATE USING (((auth.uid() = buyer_id) OR (auth.uid() = seller_id)));


--
-- Name: dealers Users can update own dealer profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own dealer profile" ON public.dealers FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: inspections Users can update own inspections; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own inspections" ON public.inspections FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: listings Users can update own listings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own listings" ON public.listings FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: messages Users can update own messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own messages" ON public.messages FOR UPDATE USING ((auth.uid() = sender_id));


--
-- Name: offer_messages Users can update own messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own messages" ON public.offer_messages FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM public.offers o
  WHERE ((o.id = offer_messages.offer_id) AND ((o.buyer_id = auth.uid()) OR (o.seller_id = auth.uid()))))));


--
-- Name: notifications Users can update own notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: offer_notifications Users can update own notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own notifications" ON public.offer_notifications FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: offer_notifications Users can update own offer notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own offer notifications" ON public.offer_notifications FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: offer_typing_indicators Users can update own offer typing indicator; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own offer typing indicator" ON public.offer_typing_indicators USING ((auth.uid() = user_id));


--
-- Name: offers Users can update own offers; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own offers" ON public.offers FOR UPDATE USING (((auth.uid() = buyer_id) OR (auth.uid() = seller_id)));


--
-- Name: user_preferences Users can update own preferences; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own preferences" ON public.user_preferences FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: price_alerts Users can update own price alerts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own price alerts" ON public.price_alerts FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: profiles Users can update own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- Name: users Users can update own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING ((auth.uid() = id));


--
-- Name: push_tokens Users can update own push tokens; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own push tokens" ON public.push_tokens FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: reviews Users can update own reviews; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING ((auth.uid() = reviewer_id));


--
-- Name: saved_searches Users can update own saved searches; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own saved searches" ON public.saved_searches FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: subscriptions Users can update own subscriptions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own subscriptions" ON public.subscriptions FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: test_drive_bookings Users can update own test drive bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own test drive bookings" ON public.test_drive_bookings FOR UPDATE USING (((auth.uid() = buyer_id) OR (auth.uid() = seller_id)));


--
-- Name: offer_typing_indicators Users can update own typing; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own typing" ON public.offer_typing_indicators USING ((auth.uid() = user_id));


--
-- Name: typing_indicators Users can update own typing indicator; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own typing indicator" ON public.typing_indicators USING ((auth.uid() = user_id));


--
-- Name: typing_indicators Users can update own typing status; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own typing status" ON public.typing_indicators USING ((auth.uid() = user_id));


--
-- Name: vehicles Users can update own vehicles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own vehicles" ON public.vehicles FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: user_verifications Users can update own verifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own verifications" ON public.user_verifications FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: users Users can view all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view all users" ON public.users FOR SELECT USING (true);


--
-- Name: messages Users can view messages in their conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view messages in their conversations" ON public.messages FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.conversations c
  WHERE ((c.id = messages.conversation_id) AND ((c.buyer_id = auth.uid()) OR (c.seller_id = auth.uid()))))));


--
-- Name: offer_messages Users can view offer messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view offer messages" ON public.offer_messages FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.offers o
  WHERE ((o.id = offer_messages.offer_id) AND ((o.buyer_id = auth.uid()) OR (o.seller_id = auth.uid()))))));


--
-- Name: offer_typing_indicators Users can view offer typing indicators; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view offer typing indicators" ON public.offer_typing_indicators FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.offers o
  WHERE ((o.id = offer_typing_indicators.offer_id) AND ((o.buyer_id = auth.uid()) OR (o.seller_id = auth.uid()))))));


--
-- Name: two_factor_auth Users can view own 2FA; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own 2FA" ON public.two_factor_auth FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: two_factor_auth Users can view own 2FA settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own 2FA settings" ON public.two_factor_auth FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: phone_otps Users can view own OTPs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own OTPs" ON public.phone_otps FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: vin_report_purchases Users can view own VIN report purchases; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own VIN report purchases" ON public.vin_report_purchases FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: vin_report_purchases Users can view own VIN reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own VIN reports" ON public.vin_report_purchases FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: vin_reports Users can view own VIN reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own VIN reports" ON public.vin_reports FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: price_alerts Users can view own alerts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own alerts" ON public.price_alerts FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: ab_test_assignments Users can view own assignments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own assignments" ON public.ab_test_assignments FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_bans Users can view own bans; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own bans" ON public.user_bans FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: test_drive_bookings Users can view own bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own bookings" ON public.test_drive_bookings FOR SELECT USING (((auth.uid() = user_id) OR (auth.uid() = seller_id)));


--
-- Name: listing_boosts Users can view own boosts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own boosts" ON public.listing_boosts FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: contact_messages Users can view own contact messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own contact messages" ON public.contact_messages FOR SELECT USING (((auth.uid() = user_id) OR (user_id IS NULL)));


--
-- Name: conversations Users can view own conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own conversations" ON public.conversations FOR SELECT USING (((auth.uid() = buyer_id) OR (auth.uid() = seller_id)));


--
-- Name: deleted_conversations Users can view own deleted; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own deleted" ON public.deleted_conversations FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: subscription_events Users can view own events; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own events" ON public.subscription_events FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: favorites Users can view own favorites; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: recently_viewed Users can view own history; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own history" ON public.recently_viewed FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: vehicle_inquiries Users can view own inquiries; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own inquiries" ON public.vehicle_inquiries FOR SELECT USING (((auth.uid() = user_id) OR (EXISTS ( SELECT 1
   FROM public.vehicles v
  WHERE ((v.id = vehicle_inquiries.vehicle_id) AND (v.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.listings l
  WHERE ((l.id = vehicle_inquiries.listing_id) AND (l.user_id = auth.uid()))))));


--
-- Name: inspections Users can view own inspections; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own inspections" ON public.inspections FOR SELECT USING (((auth.uid() = user_id) OR (auth.uid() = inspector_id)));


--
-- Name: linked_accounts Users can view own linked accounts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own linked accounts" ON public.linked_accounts FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: listing_boosts Users can view own listing boosts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own listing boosts" ON public.listing_boosts FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: listing_reports Users can view own listing reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own listing reports" ON public.listing_reports FOR SELECT USING ((auth.uid() = reporter_id));


--
-- Name: contact_messages Users can view own messages; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own messages" ON public.contact_messages FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: muted_conversations Users can view own muted; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own muted" ON public.muted_conversations FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: notifications Users can view own notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: offer_notifications Users can view own notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own notifications" ON public.offer_notifications FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: offer_notifications Users can view own offer notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own offer notifications" ON public.offer_notifications FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: offers Users can view own offers; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own offers" ON public.offers FOR SELECT USING (((auth.uid() = buyer_id) OR (auth.uid() = seller_id)));


--
-- Name: payments Users can view own payments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_preferences Users can view own preferences; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own preferences" ON public.user_preferences FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: price_alerts Users can view own price alerts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own price alerts" ON public.price_alerts FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: users Users can view own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING ((auth.uid() = id));


--
-- Name: purchases Users can view own purchases; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own purchases" ON public.purchases FOR SELECT USING (((auth.uid() = buyer_id) OR (auth.uid() = seller_id)));


--
-- Name: push_tokens Users can view own push tokens; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own push tokens" ON public.push_tokens FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: recently_viewed Users can view own recently viewed; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own recently viewed" ON public.recently_viewed FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: refund_requests Users can view own refund requests; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own refund requests" ON public.refund_requests FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: listing_reports Users can view own reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own reports" ON public.listing_reports FOR SELECT USING ((auth.uid() = reporter_id));


--
-- Name: user_reports Users can view own reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own reports" ON public.user_reports FOR SELECT USING ((auth.uid() = reporter_id));


--
-- Name: saved_searches Users can view own saved searches; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own saved searches" ON public.saved_searches FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: search_history Users can view own search history; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own search history" ON public.search_history FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_sessions Users can view own sessions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own sessions" ON public.user_sessions FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: subscriptions Users can view own subscriptions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: test_drive_bookings Users can view own test drive bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own test drive bookings" ON public.test_drive_bookings FOR SELECT USING (((auth.uid() = buyer_id) OR (auth.uid() = seller_id)));


--
-- Name: promo_code_usage Users can view own usage; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own usage" ON public.promo_code_usage FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_reports Users can view own user reports; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own user reports" ON public.user_reports FOR SELECT USING ((auth.uid() = reporter_id));


--
-- Name: user_verifications Users can view own verifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own verifications" ON public.user_verifications FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: typing_indicators Users can view typing indicators in their conversations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view typing indicators in their conversations" ON public.typing_indicators FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.conversations c
  WHERE ((c.id = typing_indicators.conversation_id) AND ((c.buyer_id = auth.uid()) OR (c.seller_id = auth.uid()))))));


--
-- Name: video_thumbnails Vehicle owners can manage thumbnails; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Vehicle owners can manage thumbnails" ON public.video_thumbnails USING (((EXISTS ( SELECT 1
   FROM public.vehicles v
  WHERE ((v.id = video_thumbnails.vehicle_id) AND (v.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.listings l
  WHERE ((l.id = video_thumbnails.listing_id) AND (l.user_id = auth.uid()))))));


--
-- Name: vehicle_inquiries Vehicle owners can update inquiry status; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Vehicle owners can update inquiry status" ON public.vehicle_inquiries FOR UPDATE USING (((EXISTS ( SELECT 1
   FROM public.vehicles v
  WHERE ((v.id = vehicle_inquiries.vehicle_id) AND (v.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.listings l
  WHERE ((l.id = vehicle_inquiries.listing_id) AND (l.user_id = auth.uid()))))));


--
-- Name: vehicle_views Vehicle owners can view their stats; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Vehicle owners can view their stats" ON public.vehicle_views FOR SELECT USING (((EXISTS ( SELECT 1
   FROM public.vehicles v
  WHERE ((v.id = vehicle_views.vehicle_id) AND (v.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM public.listings l
  WHERE ((l.id = vehicle_views.listing_id) AND (l.user_id = auth.uid()))))));


--
-- Name: ab_test_assignments; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.ab_test_assignments ENABLE ROW LEVEL SECURITY;

--
-- Name: ab_tests; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.ab_tests ENABLE ROW LEVEL SECURITY;

--
-- Name: admin_activity_log; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

--
-- Name: admin_activity_log admin_activity_log_admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_activity_log_admin_insert ON public.admin_activity_log FOR INSERT WITH CHECK (public.is_admin(auth.uid()));


--
-- Name: admin_activity_log admin_activity_log_admin_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_activity_log_admin_select ON public.admin_activity_log FOR SELECT USING (public.is_admin(auth.uid()));


--
-- Name: admin_roles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: admin_roles admin_roles_admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_roles_admin_delete ON public.admin_roles FOR DELETE USING (public.is_admin(auth.uid()));


--
-- Name: admin_roles admin_roles_admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_roles_admin_insert ON public.admin_roles FOR INSERT WITH CHECK (public.is_admin(auth.uid()));


--
-- Name: admin_roles admin_roles_admin_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_roles_admin_select ON public.admin_roles FOR SELECT USING (public.is_admin(auth.uid()));


--
-- Name: admin_roles admin_roles_admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_roles_admin_update ON public.admin_roles FOR UPDATE USING (public.is_admin(auth.uid()));


--
-- Name: admin_users; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

--
-- Name: admin_users admin_users_admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_users_admin_delete ON public.admin_users FOR DELETE USING (public.is_admin(auth.uid()));


--
-- Name: admin_users admin_users_admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_users_admin_insert ON public.admin_users FOR INSERT WITH CHECK (public.is_admin(auth.uid()));


--
-- Name: admin_users admin_users_admin_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_users_admin_select ON public.admin_users FOR SELECT USING ((public.is_admin(auth.uid()) OR (user_id = auth.uid())));


--
-- Name: admin_users admin_users_admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY admin_users_admin_update ON public.admin_users FOR UPDATE USING (public.is_admin(auth.uid()));


--
-- Name: analytics_events; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

--
-- Name: contact_messages; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

--
-- Name: conversations; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

--
-- Name: conversations conversations_participant_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY conversations_participant_insert ON public.conversations FOR INSERT WITH CHECK (((buyer_id = auth.uid()) OR (seller_id = auth.uid())));


--
-- Name: conversations conversations_participant_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY conversations_participant_select ON public.conversations FOR SELECT USING (((buyer_id = auth.uid()) OR (seller_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: conversations conversations_participant_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY conversations_participant_update ON public.conversations FOR UPDATE USING (((buyer_id = auth.uid()) OR (seller_id = auth.uid())));


--
-- Name: dealers; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;

--
-- Name: dealers dealers_owner_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY dealers_owner_delete ON public.dealers FOR DELETE USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: dealers dealers_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY dealers_owner_insert ON public.dealers FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: dealers dealers_owner_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY dealers_owner_update ON public.dealers FOR UPDATE USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: dealers dealers_public_read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY dealers_public_read ON public.dealers FOR SELECT USING (true);


--
-- Name: deleted_conversations; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.deleted_conversations ENABLE ROW LEVEL SECURITY;

--
-- Name: favorites; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

--
-- Name: favorites favorites_owner_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY favorites_owner_delete ON public.favorites FOR DELETE USING ((user_id = auth.uid()));


--
-- Name: favorites favorites_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY favorites_owner_insert ON public.favorites FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: favorites favorites_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY favorites_owner_select ON public.favorites FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: inspections; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.inspections ENABLE ROW LEVEL SECURITY;

--
-- Name: inspectors; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.inspectors ENABLE ROW LEVEL SECURITY;

--
-- Name: linked_accounts; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.linked_accounts ENABLE ROW LEVEL SECURITY;

--
-- Name: linked_accounts linked_accounts_owner_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY linked_accounts_owner_delete ON public.linked_accounts FOR DELETE USING ((user_id = auth.uid()));


--
-- Name: linked_accounts linked_accounts_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY linked_accounts_owner_insert ON public.linked_accounts FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: linked_accounts linked_accounts_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY linked_accounts_owner_select ON public.linked_accounts FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: listing_boosts; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.listing_boosts ENABLE ROW LEVEL SECURITY;

--
-- Name: listing_reports; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.listing_reports ENABLE ROW LEVEL SECURITY;

--
-- Name: listing_reports listing_reports_admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY listing_reports_admin_update ON public.listing_reports FOR UPDATE USING (public.is_admin(auth.uid()));


--
-- Name: listing_reports listing_reports_reporter_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY listing_reports_reporter_insert ON public.listing_reports FOR INSERT WITH CHECK ((reporter_id = auth.uid()));


--
-- Name: listing_reports listing_reports_reporter_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY listing_reports_reporter_select ON public.listing_reports FOR SELECT USING (((reporter_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: listings; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

--
-- Name: listings listings_owner_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY listings_owner_delete ON public.listings FOR DELETE USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: listings listings_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY listings_owner_insert ON public.listings FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: listings listings_owner_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY listings_owner_update ON public.listings FOR UPDATE USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: listings listings_public_read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY listings_public_read ON public.listings FOR SELECT USING (((status = 'active'::text) OR (user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: messages; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: messages messages_participant_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY messages_participant_insert ON public.messages FOR INSERT WITH CHECK ((sender_id = auth.uid()));


--
-- Name: messages messages_participant_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY messages_participant_select ON public.messages FOR SELECT USING (((sender_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM public.conversations c
  WHERE ((c.id = messages.conversation_id) AND ((c.buyer_id = auth.uid()) OR (c.seller_id = auth.uid()))))) OR public.is_admin(auth.uid())));


--
-- Name: messages messages_participant_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY messages_participant_update ON public.messages FOR UPDATE USING ((sender_id = auth.uid()));


--
-- Name: muted_conversations; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.muted_conversations ENABLE ROW LEVEL SECURITY;

--
-- Name: notifications; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

--
-- Name: notifications notifications_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY notifications_owner_select ON public.notifications FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: notifications notifications_owner_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY notifications_owner_update ON public.notifications FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: notifications notifications_system_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY notifications_system_insert ON public.notifications FOR INSERT WITH CHECK (true);


--
-- Name: offer_messages; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.offer_messages ENABLE ROW LEVEL SECURITY;

--
-- Name: offer_messages offer_messages_participant_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY offer_messages_participant_insert ON public.offer_messages FOR INSERT WITH CHECK ((sender_id = auth.uid()));


--
-- Name: offer_messages offer_messages_participant_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY offer_messages_participant_select ON public.offer_messages FOR SELECT USING (((sender_id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM public.offers o
  WHERE ((o.id = offer_messages.offer_id) AND ((o.buyer_id = auth.uid()) OR (o.seller_id = auth.uid()))))) OR public.is_admin(auth.uid())));


--
-- Name: offer_notifications; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.offer_notifications ENABLE ROW LEVEL SECURITY;

--
-- Name: offer_notifications offer_notifications_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY offer_notifications_owner_select ON public.offer_notifications FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: offer_notifications offer_notifications_owner_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY offer_notifications_owner_update ON public.offer_notifications FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: offer_notifications offer_notifications_system_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY offer_notifications_system_insert ON public.offer_notifications FOR INSERT WITH CHECK (true);


--
-- Name: offer_typing_indicators; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.offer_typing_indicators ENABLE ROW LEVEL SECURITY;

--
-- Name: offer_typing_indicators offer_typing_indicators_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY offer_typing_indicators_delete ON public.offer_typing_indicators FOR DELETE USING ((user_id = auth.uid()));


--
-- Name: offer_typing_indicators offer_typing_indicators_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY offer_typing_indicators_insert ON public.offer_typing_indicators FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: offer_typing_indicators offer_typing_indicators_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY offer_typing_indicators_select ON public.offer_typing_indicators FOR SELECT USING (true);


--
-- Name: offer_typing_indicators offer_typing_indicators_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY offer_typing_indicators_update ON public.offer_typing_indicators FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: offers; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

--
-- Name: offers offers_buyer_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY offers_buyer_insert ON public.offers FOR INSERT WITH CHECK ((buyer_id = auth.uid()));


--
-- Name: offers offers_participant_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY offers_participant_select ON public.offers FOR SELECT USING (((buyer_id = auth.uid()) OR (seller_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: offers offers_participant_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY offers_participant_update ON public.offers FOR UPDATE USING (((buyer_id = auth.uid()) OR (seller_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: payments; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

--
-- Name: payments payments_admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY payments_admin_update ON public.payments FOR UPDATE USING (public.is_admin(auth.uid()));


--
-- Name: payments payments_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY payments_owner_select ON public.payments FOR SELECT USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: payments payments_system_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY payments_system_insert ON public.payments FOR INSERT WITH CHECK (true);


--
-- Name: phone_otps; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.phone_otps ENABLE ROW LEVEL SECURITY;

--
-- Name: phone_otps phone_otps_owner_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY phone_otps_owner_delete ON public.phone_otps FOR DELETE USING ((user_id = auth.uid()));


--
-- Name: phone_otps phone_otps_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY phone_otps_owner_select ON public.phone_otps FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: phone_otps phone_otps_owner_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY phone_otps_owner_update ON public.phone_otps FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: phone_otps phone_otps_system_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY phone_otps_system_insert ON public.phone_otps FOR INSERT WITH CHECK (true);


--
-- Name: price_alerts; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.price_alerts ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles profiles_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY profiles_owner_insert ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = id));


--
-- Name: profiles profiles_owner_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY profiles_owner_update ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- Name: profiles profiles_public_read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY profiles_public_read ON public.profiles FOR SELECT USING (true);


--
-- Name: promo_code_usage; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.promo_code_usage ENABLE ROW LEVEL SECURITY;

--
-- Name: promo_code_usage promo_code_usage_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY promo_code_usage_owner_insert ON public.promo_code_usage FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: promo_code_usage promo_code_usage_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY promo_code_usage_owner_select ON public.promo_code_usage FOR SELECT USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: promo_codes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

--
-- Name: promo_codes promo_codes_admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY promo_codes_admin_delete ON public.promo_codes FOR DELETE USING (public.is_admin(auth.uid()));


--
-- Name: promo_codes promo_codes_admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY promo_codes_admin_insert ON public.promo_codes FOR INSERT WITH CHECK (public.is_admin(auth.uid()));


--
-- Name: promo_codes promo_codes_admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY promo_codes_admin_update ON public.promo_codes FOR UPDATE USING (public.is_admin(auth.uid()));


--
-- Name: promo_codes promo_codes_public_read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY promo_codes_public_read ON public.promo_codes FOR SELECT USING (((is_active = true) OR public.is_admin(auth.uid())));


--
-- Name: purchases; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

--
-- Name: purchases purchases_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY purchases_owner_insert ON public.purchases FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: purchases purchases_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY purchases_owner_select ON public.purchases FOR SELECT USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: push_tokens; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.push_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: push_tokens push_tokens_owner_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY push_tokens_owner_delete ON public.push_tokens FOR DELETE USING ((user_id = auth.uid()));


--
-- Name: push_tokens push_tokens_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY push_tokens_owner_insert ON public.push_tokens FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: push_tokens push_tokens_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY push_tokens_owner_select ON public.push_tokens FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: push_tokens push_tokens_owner_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY push_tokens_owner_update ON public.push_tokens FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: recently_viewed; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.recently_viewed ENABLE ROW LEVEL SECURITY;

--
-- Name: recently_viewed recently_viewed_owner_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY recently_viewed_owner_delete ON public.recently_viewed FOR DELETE USING ((user_id = auth.uid()));


--
-- Name: recently_viewed recently_viewed_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY recently_viewed_owner_insert ON public.recently_viewed FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: recently_viewed recently_viewed_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY recently_viewed_owner_select ON public.recently_viewed FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: refund_requests; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.refund_requests ENABLE ROW LEVEL SECURITY;

--
-- Name: refund_requests refund_requests_admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY refund_requests_admin_update ON public.refund_requests FOR UPDATE USING (public.is_admin(auth.uid()));


--
-- Name: refund_requests refund_requests_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY refund_requests_owner_insert ON public.refund_requests FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: refund_requests refund_requests_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY refund_requests_owner_select ON public.refund_requests FOR SELECT USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: reviews; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

--
-- Name: saved_searches; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;

--
-- Name: saved_searches saved_searches_owner_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY saved_searches_owner_delete ON public.saved_searches FOR DELETE USING ((user_id = auth.uid()));


--
-- Name: saved_searches saved_searches_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY saved_searches_owner_insert ON public.saved_searches FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: saved_searches saved_searches_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY saved_searches_owner_select ON public.saved_searches FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: saved_searches saved_searches_owner_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY saved_searches_owner_update ON public.saved_searches FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: scheduled_admin_actions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.scheduled_admin_actions ENABLE ROW LEVEL SECURITY;

--
-- Name: scheduled_admin_actions scheduled_admin_actions_admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY scheduled_admin_actions_admin_delete ON public.scheduled_admin_actions FOR DELETE USING (public.is_admin(auth.uid()));


--
-- Name: scheduled_admin_actions scheduled_admin_actions_admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY scheduled_admin_actions_admin_insert ON public.scheduled_admin_actions FOR INSERT WITH CHECK (public.is_admin(auth.uid()));


--
-- Name: scheduled_admin_actions scheduled_admin_actions_admin_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY scheduled_admin_actions_admin_select ON public.scheduled_admin_actions FOR SELECT USING (public.is_admin(auth.uid()));


--
-- Name: scheduled_admin_actions scheduled_admin_actions_admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY scheduled_admin_actions_admin_update ON public.scheduled_admin_actions FOR UPDATE USING (public.is_admin(auth.uid()));


--
-- Name: search_cache; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.search_cache ENABLE ROW LEVEL SECURITY;

--
-- Name: search_cache search_cache_public_read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY search_cache_public_read ON public.search_cache FOR SELECT USING ((expires_at > now()));


--
-- Name: search_cache search_cache_service_manage; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY search_cache_service_manage ON public.search_cache USING (true);


--
-- Name: search_history; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

--
-- Name: site_settings; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

--
-- Name: site_settings site_settings_admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY site_settings_admin_delete ON public.site_settings FOR DELETE USING (public.is_admin(auth.uid()));


--
-- Name: site_settings site_settings_admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY site_settings_admin_insert ON public.site_settings FOR INSERT WITH CHECK (public.is_admin(auth.uid()));


--
-- Name: site_settings site_settings_admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY site_settings_admin_update ON public.site_settings FOR UPDATE USING (public.is_admin(auth.uid()));


--
-- Name: site_settings site_settings_public_read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY site_settings_public_read ON public.site_settings FOR SELECT USING (true);


--
-- Name: subscription_events; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.subscription_events ENABLE ROW LEVEL SECURITY;

--
-- Name: subscription_events subscription_events_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY subscription_events_owner_select ON public.subscription_events FOR SELECT USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: subscription_events subscription_events_system_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY subscription_events_system_insert ON public.subscription_events FOR INSERT WITH CHECK (true);


--
-- Name: subscriptions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

--
-- Name: subscriptions subscriptions_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY subscriptions_owner_insert ON public.subscriptions FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: subscriptions subscriptions_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY subscriptions_owner_select ON public.subscriptions FOR SELECT USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: subscriptions subscriptions_owner_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY subscriptions_owner_update ON public.subscriptions FOR UPDATE USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: test_drive_bookings; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.test_drive_bookings ENABLE ROW LEVEL SECURITY;

--
-- Name: two_factor_auth; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.two_factor_auth ENABLE ROW LEVEL SECURITY;

--
-- Name: two_factor_auth two_factor_auth_owner_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY two_factor_auth_owner_delete ON public.two_factor_auth FOR DELETE USING ((user_id = auth.uid()));


--
-- Name: two_factor_auth two_factor_auth_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY two_factor_auth_owner_insert ON public.two_factor_auth FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: two_factor_auth two_factor_auth_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY two_factor_auth_owner_select ON public.two_factor_auth FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: two_factor_auth two_factor_auth_owner_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY two_factor_auth_owner_update ON public.two_factor_auth FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: typing_indicators; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.typing_indicators ENABLE ROW LEVEL SECURITY;

--
-- Name: typing_indicators typing_indicators_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY typing_indicators_delete ON public.typing_indicators FOR DELETE USING ((user_id = auth.uid()));


--
-- Name: typing_indicators typing_indicators_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY typing_indicators_insert ON public.typing_indicators FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: typing_indicators typing_indicators_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY typing_indicators_select ON public.typing_indicators FOR SELECT USING (true);


--
-- Name: typing_indicators typing_indicators_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY typing_indicators_update ON public.typing_indicators FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: user_bans; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_bans ENABLE ROW LEVEL SECURITY;

--
-- Name: user_bans user_bans_admin_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_bans_admin_delete ON public.user_bans FOR DELETE USING (public.is_admin(auth.uid()));


--
-- Name: user_bans user_bans_admin_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_bans_admin_insert ON public.user_bans FOR INSERT WITH CHECK (public.is_admin(auth.uid()));


--
-- Name: user_bans user_bans_admin_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_bans_admin_select ON public.user_bans FOR SELECT USING ((public.is_admin(auth.uid()) OR (user_id = auth.uid())));


--
-- Name: user_bans user_bans_admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_bans_admin_update ON public.user_bans FOR UPDATE USING (public.is_admin(auth.uid()));


--
-- Name: user_preferences; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

--
-- Name: user_preferences user_preferences_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_preferences_owner_insert ON public.user_preferences FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: user_preferences user_preferences_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_preferences_owner_select ON public.user_preferences FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: user_preferences user_preferences_owner_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_preferences_owner_update ON public.user_preferences FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: user_reports; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_reports ENABLE ROW LEVEL SECURITY;

--
-- Name: user_reports user_reports_admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_reports_admin_update ON public.user_reports FOR UPDATE USING (public.is_admin(auth.uid()));


--
-- Name: user_reports user_reports_reporter_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_reports_reporter_insert ON public.user_reports FOR INSERT WITH CHECK ((reporter_id = auth.uid()));


--
-- Name: user_reports user_reports_reporter_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_reports_reporter_select ON public.user_reports FOR SELECT USING (((reporter_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: user_sessions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: user_sessions user_sessions_owner_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_sessions_owner_delete ON public.user_sessions FOR DELETE USING ((user_id = auth.uid()));


--
-- Name: user_sessions user_sessions_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_sessions_owner_insert ON public.user_sessions FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: user_sessions user_sessions_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_sessions_owner_select ON public.user_sessions FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: user_sessions user_sessions_owner_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_sessions_owner_update ON public.user_sessions FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: user_verifications; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_verifications ENABLE ROW LEVEL SECURITY;

--
-- Name: user_verifications user_verifications_admin_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_verifications_admin_update ON public.user_verifications FOR UPDATE USING (public.is_admin(auth.uid()));


--
-- Name: user_verifications user_verifications_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_verifications_owner_insert ON public.user_verifications FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: user_verifications user_verifications_owner_select; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_verifications_owner_select ON public.user_verifications FOR SELECT USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: users; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

--
-- Name: users users_insert_own; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY users_insert_own ON public.users FOR INSERT WITH CHECK ((auth.uid() = id));


--
-- Name: users users_public_read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY users_public_read ON public.users FOR SELECT USING (true);


--
-- Name: users users_select_own; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY users_select_own ON public.users FOR SELECT USING (((auth.uid() = id) OR public.is_admin(auth.uid())));


--
-- Name: users users_update_own; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY users_update_own ON public.users FOR UPDATE USING ((auth.uid() = id));


--
-- Name: vehicle_inquiries; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.vehicle_inquiries ENABLE ROW LEVEL SECURITY;

--
-- Name: vehicle_views; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.vehicle_views ENABLE ROW LEVEL SECURITY;

--
-- Name: vehicles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

--
-- Name: vehicles vehicles_owner_delete; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY vehicles_owner_delete ON public.vehicles FOR DELETE USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: vehicles vehicles_owner_insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY vehicles_owner_insert ON public.vehicles FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: vehicles vehicles_owner_update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY vehicles_owner_update ON public.vehicles FOR UPDATE USING (((user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: vehicles vehicles_public_read; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY vehicles_public_read ON public.vehicles FOR SELECT USING (((status = 'active'::text) OR (user_id = auth.uid()) OR public.is_admin(auth.uid())));


--
-- Name: video_thumbnails; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.video_thumbnails ENABLE ROW LEVEL SECURITY;

--
-- Name: vin_report_cache; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.vin_report_cache ENABLE ROW LEVEL SECURITY;

--
-- Name: vin_report_purchases; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.vin_report_purchases ENABLE ROW LEVEL SECURITY;

--
-- Name: vin_reports; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.vin_reports ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: objects Anyone can view avatars; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Anyone can view avatars" ON storage.objects FOR SELECT USING ((bucket_id = 'avatars'::text));


--
-- Name: objects Anyone can view listing images; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Anyone can view listing images" ON storage.objects FOR SELECT USING ((bucket_id = 'listings'::text));


--
-- Name: objects Authenticated users can upload avatars; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Authenticated users can upload avatars" ON storage.objects FOR INSERT WITH CHECK (((bucket_id = 'avatars'::text) AND (auth.role() = 'authenticated'::text)));


--
-- Name: objects Authenticated users can upload listing images; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Authenticated users can upload listing images" ON storage.objects FOR INSERT WITH CHECK (((bucket_id = 'listings'::text) AND (auth.role() = 'authenticated'::text)));


--
-- Name: objects Users can delete own avatar; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Users can delete own avatar" ON storage.objects FOR DELETE USING (((bucket_id = 'avatars'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


--
-- Name: objects Users can delete own listing images; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Users can delete own listing images" ON storage.objects FOR DELETE USING (((bucket_id = 'listings'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


--
-- Name: objects Users can update own avatar; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Users can update own avatar" ON storage.objects FOR UPDATE USING (((bucket_id = 'avatars'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


--
-- Name: objects Users can update own listing images; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Users can update own listing images" ON storage.objects FOR UPDATE USING (((bucket_id = 'listings'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_vectors; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_vectors ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: prefixes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.prefixes ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: vector_indexes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.vector_indexes ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: supabase_realtime conversations; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.conversations;


--
-- Name: supabase_realtime inspections; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.inspections;


--
-- Name: supabase_realtime messages; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.messages;


--
-- Name: supabase_realtime notifications; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.notifications;


--
-- Name: supabase_realtime offer_messages; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.offer_messages;


--
-- Name: supabase_realtime offer_notifications; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.offer_notifications;


--
-- Name: supabase_realtime offer_typing_indicators; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.offer_typing_indicators;


--
-- Name: supabase_realtime offers; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.offers;


--
-- Name: supabase_realtime price_alerts; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.price_alerts;


--
-- Name: supabase_realtime test_drive_bookings; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.test_drive_bookings;


--
-- Name: supabase_realtime typing_indicators; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.typing_indicators;


--
-- Name: supabase_realtime vehicles; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.vehicles;


--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION pg_reload_conf(); Type: ACL; Schema: pg_catalog; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pg_catalog.pg_reload_conf() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;


--
-- Name: FUNCTION check_listing_limit(check_user_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.check_listing_limit(check_user_id uuid) TO anon;
GRANT ALL ON FUNCTION public.check_listing_limit(check_user_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.check_listing_limit(check_user_id uuid) TO service_role;


--
-- Name: FUNCTION cleanup_expired_search_cache(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.cleanup_expired_search_cache() TO anon;
GRANT ALL ON FUNCTION public.cleanup_expired_search_cache() TO authenticated;
GRANT ALL ON FUNCTION public.cleanup_expired_search_cache() TO service_role;


--
-- Name: FUNCTION get_user_subscription(check_user_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_user_subscription(check_user_id uuid) TO anon;
GRANT ALL ON FUNCTION public.get_user_subscription(check_user_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_user_subscription(check_user_id uuid) TO service_role;


--
-- Name: FUNCTION handle_new_user(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_new_user() TO anon;
GRANT ALL ON FUNCTION public.handle_new_user() TO authenticated;
GRANT ALL ON FUNCTION public.handle_new_user() TO service_role;


--
-- Name: FUNCTION increment_favorites_count(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.increment_favorites_count() TO anon;
GRANT ALL ON FUNCTION public.increment_favorites_count() TO authenticated;
GRANT ALL ON FUNCTION public.increment_favorites_count() TO service_role;


--
-- Name: FUNCTION increment_vehicle_views(vehicle_uuid uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.increment_vehicle_views(vehicle_uuid uuid) TO anon;
GRANT ALL ON FUNCTION public.increment_vehicle_views(vehicle_uuid uuid) TO authenticated;
GRANT ALL ON FUNCTION public.increment_vehicle_views(vehicle_uuid uuid) TO service_role;


--
-- Name: FUNCTION invalidate_search_cache(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.invalidate_search_cache() TO anon;
GRANT ALL ON FUNCTION public.invalidate_search_cache() TO authenticated;
GRANT ALL ON FUNCTION public.invalidate_search_cache() TO service_role;


--
-- Name: FUNCTION is_admin(user_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.is_admin(user_id uuid) TO anon;
GRANT ALL ON FUNCTION public.is_admin(user_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.is_admin(user_id uuid) TO service_role;


--
-- Name: FUNCTION is_user_banned(check_user_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.is_user_banned(check_user_id uuid) TO anon;
GRANT ALL ON FUNCTION public.is_user_banned(check_user_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.is_user_banned(check_user_id uuid) TO service_role;


--
-- Name: FUNCTION notify_saved_search_matches(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.notify_saved_search_matches() TO anon;
GRANT ALL ON FUNCTION public.notify_saved_search_matches() TO authenticated;
GRANT ALL ON FUNCTION public.notify_saved_search_matches() TO service_role;


--
-- Name: FUNCTION notify_saved_search_matches_on_update(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.notify_saved_search_matches_on_update() TO anon;
GRANT ALL ON FUNCTION public.notify_saved_search_matches_on_update() TO authenticated;
GRANT ALL ON FUNCTION public.notify_saved_search_matches_on_update() TO service_role;


--
-- Name: FUNCTION owns_listing(user_id uuid, listing_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.owns_listing(user_id uuid, listing_id uuid) TO anon;
GRANT ALL ON FUNCTION public.owns_listing(user_id uuid, listing_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.owns_listing(user_id uuid, listing_id uuid) TO service_role;


--
-- Name: FUNCTION owns_vehicle(user_id uuid, vehicle_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.owns_vehicle(user_id uuid, vehicle_id uuid) TO anon;
GRANT ALL ON FUNCTION public.owns_vehicle(user_id uuid, vehicle_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.owns_vehicle(user_id uuid, vehicle_id uuid) TO service_role;


--
-- Name: FUNCTION update_promo_usage_count(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_promo_usage_count() TO anon;
GRANT ALL ON FUNCTION public.update_promo_usage_count() TO authenticated;
GRANT ALL ON FUNCTION public.update_promo_usage_count() TO service_role;


--
-- Name: FUNCTION update_updated_at_column(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_updated_at_column() TO anon;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO authenticated;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO service_role;


--
-- Name: FUNCTION update_vehicle_search_vector(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_vehicle_search_vector() TO anon;
GRANT ALL ON FUNCTION public.update_vehicle_search_vector() TO authenticated;
GRANT ALL ON FUNCTION public.update_vehicle_search_vector() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE oauth_authorizations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_authorizations TO postgres;
GRANT ALL ON TABLE auth.oauth_authorizations TO dashboard_user;


--
-- Name: TABLE oauth_client_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_client_states TO postgres;
GRANT ALL ON TABLE auth.oauth_client_states TO dashboard_user;


--
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_clients TO postgres;
GRANT ALL ON TABLE auth.oauth_clients TO dashboard_user;


--
-- Name: TABLE oauth_consents; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_consents TO postgres;
GRANT ALL ON TABLE auth.oauth_consents TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE ab_test_assignments; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.ab_test_assignments TO anon;
GRANT ALL ON TABLE public.ab_test_assignments TO authenticated;
GRANT ALL ON TABLE public.ab_test_assignments TO service_role;


--
-- Name: TABLE ab_tests; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.ab_tests TO anon;
GRANT ALL ON TABLE public.ab_tests TO authenticated;
GRANT ALL ON TABLE public.ab_tests TO service_role;


--
-- Name: TABLE admin_activity_log; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.admin_activity_log TO anon;
GRANT ALL ON TABLE public.admin_activity_log TO authenticated;
GRANT ALL ON TABLE public.admin_activity_log TO service_role;


--
-- Name: TABLE admin_roles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.admin_roles TO anon;
GRANT ALL ON TABLE public.admin_roles TO authenticated;
GRANT ALL ON TABLE public.admin_roles TO service_role;


--
-- Name: TABLE admin_users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.admin_users TO anon;
GRANT ALL ON TABLE public.admin_users TO authenticated;
GRANT ALL ON TABLE public.admin_users TO service_role;


--
-- Name: TABLE analytics_events; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.analytics_events TO anon;
GRANT ALL ON TABLE public.analytics_events TO authenticated;
GRANT ALL ON TABLE public.analytics_events TO service_role;


--
-- Name: TABLE contact_messages; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.contact_messages TO anon;
GRANT ALL ON TABLE public.contact_messages TO authenticated;
GRANT ALL ON TABLE public.contact_messages TO service_role;


--
-- Name: TABLE conversations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.conversations TO anon;
GRANT ALL ON TABLE public.conversations TO authenticated;
GRANT ALL ON TABLE public.conversations TO service_role;


--
-- Name: TABLE dealers; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.dealers TO anon;
GRANT ALL ON TABLE public.dealers TO authenticated;
GRANT ALL ON TABLE public.dealers TO service_role;


--
-- Name: TABLE deleted_conversations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.deleted_conversations TO anon;
GRANT ALL ON TABLE public.deleted_conversations TO authenticated;
GRANT ALL ON TABLE public.deleted_conversations TO service_role;


--
-- Name: TABLE favorites; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.favorites TO anon;
GRANT ALL ON TABLE public.favorites TO authenticated;
GRANT ALL ON TABLE public.favorites TO service_role;


--
-- Name: TABLE inspections; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.inspections TO anon;
GRANT ALL ON TABLE public.inspections TO authenticated;
GRANT ALL ON TABLE public.inspections TO service_role;


--
-- Name: TABLE inspectors; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.inspectors TO anon;
GRANT ALL ON TABLE public.inspectors TO authenticated;
GRANT ALL ON TABLE public.inspectors TO service_role;


--
-- Name: TABLE linked_accounts; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.linked_accounts TO anon;
GRANT ALL ON TABLE public.linked_accounts TO authenticated;
GRANT ALL ON TABLE public.linked_accounts TO service_role;


--
-- Name: TABLE listing_boosts; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.listing_boosts TO anon;
GRANT ALL ON TABLE public.listing_boosts TO authenticated;
GRANT ALL ON TABLE public.listing_boosts TO service_role;


--
-- Name: TABLE listing_reports; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.listing_reports TO anon;
GRANT ALL ON TABLE public.listing_reports TO authenticated;
GRANT ALL ON TABLE public.listing_reports TO service_role;


--
-- Name: TABLE listings; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.listings TO anon;
GRANT ALL ON TABLE public.listings TO authenticated;
GRANT ALL ON TABLE public.listings TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.messages TO anon;
GRANT ALL ON TABLE public.messages TO authenticated;
GRANT ALL ON TABLE public.messages TO service_role;


--
-- Name: TABLE muted_conversations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.muted_conversations TO anon;
GRANT ALL ON TABLE public.muted_conversations TO authenticated;
GRANT ALL ON TABLE public.muted_conversations TO service_role;


--
-- Name: TABLE notifications; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.notifications TO anon;
GRANT ALL ON TABLE public.notifications TO authenticated;
GRANT ALL ON TABLE public.notifications TO service_role;


--
-- Name: TABLE offer_messages; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.offer_messages TO anon;
GRANT ALL ON TABLE public.offer_messages TO authenticated;
GRANT ALL ON TABLE public.offer_messages TO service_role;


--
-- Name: TABLE offer_notifications; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.offer_notifications TO anon;
GRANT ALL ON TABLE public.offer_notifications TO authenticated;
GRANT ALL ON TABLE public.offer_notifications TO service_role;


--
-- Name: TABLE offer_typing_indicators; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.offer_typing_indicators TO anon;
GRANT ALL ON TABLE public.offer_typing_indicators TO authenticated;
GRANT ALL ON TABLE public.offer_typing_indicators TO service_role;


--
-- Name: TABLE offers; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.offers TO anon;
GRANT ALL ON TABLE public.offers TO authenticated;
GRANT ALL ON TABLE public.offers TO service_role;


--
-- Name: TABLE payments; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.payments TO anon;
GRANT ALL ON TABLE public.payments TO authenticated;
GRANT ALL ON TABLE public.payments TO service_role;


--
-- Name: TABLE phone_otps; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.phone_otps TO anon;
GRANT ALL ON TABLE public.phone_otps TO authenticated;
GRANT ALL ON TABLE public.phone_otps TO service_role;


--
-- Name: TABLE price_alerts; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.price_alerts TO anon;
GRANT ALL ON TABLE public.price_alerts TO authenticated;
GRANT ALL ON TABLE public.price_alerts TO service_role;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;


--
-- Name: TABLE promo_code_usage; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.promo_code_usage TO anon;
GRANT ALL ON TABLE public.promo_code_usage TO authenticated;
GRANT ALL ON TABLE public.promo_code_usage TO service_role;


--
-- Name: TABLE promo_codes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.promo_codes TO anon;
GRANT ALL ON TABLE public.promo_codes TO authenticated;
GRANT ALL ON TABLE public.promo_codes TO service_role;


--
-- Name: TABLE purchases; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.purchases TO anon;
GRANT ALL ON TABLE public.purchases TO authenticated;
GRANT ALL ON TABLE public.purchases TO service_role;


--
-- Name: TABLE push_tokens; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.push_tokens TO anon;
GRANT ALL ON TABLE public.push_tokens TO authenticated;
GRANT ALL ON TABLE public.push_tokens TO service_role;


--
-- Name: TABLE recently_viewed; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.recently_viewed TO anon;
GRANT ALL ON TABLE public.recently_viewed TO authenticated;
GRANT ALL ON TABLE public.recently_viewed TO service_role;


--
-- Name: TABLE refund_requests; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.refund_requests TO anon;
GRANT ALL ON TABLE public.refund_requests TO authenticated;
GRANT ALL ON TABLE public.refund_requests TO service_role;


--
-- Name: TABLE reviews; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.reviews TO anon;
GRANT ALL ON TABLE public.reviews TO authenticated;
GRANT ALL ON TABLE public.reviews TO service_role;


--
-- Name: TABLE saved_searches; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.saved_searches TO anon;
GRANT ALL ON TABLE public.saved_searches TO authenticated;
GRANT ALL ON TABLE public.saved_searches TO service_role;


--
-- Name: TABLE scheduled_admin_actions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.scheduled_admin_actions TO anon;
GRANT ALL ON TABLE public.scheduled_admin_actions TO authenticated;
GRANT ALL ON TABLE public.scheduled_admin_actions TO service_role;


--
-- Name: TABLE search_cache; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.search_cache TO anon;
GRANT ALL ON TABLE public.search_cache TO authenticated;
GRANT ALL ON TABLE public.search_cache TO service_role;


--
-- Name: TABLE search_history; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.search_history TO anon;
GRANT ALL ON TABLE public.search_history TO authenticated;
GRANT ALL ON TABLE public.search_history TO service_role;


--
-- Name: TABLE site_settings; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.site_settings TO anon;
GRANT ALL ON TABLE public.site_settings TO authenticated;
GRANT ALL ON TABLE public.site_settings TO service_role;


--
-- Name: TABLE subscription_events; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.subscription_events TO anon;
GRANT ALL ON TABLE public.subscription_events TO authenticated;
GRANT ALL ON TABLE public.subscription_events TO service_role;


--
-- Name: TABLE subscriptions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.subscriptions TO anon;
GRANT ALL ON TABLE public.subscriptions TO authenticated;
GRANT ALL ON TABLE public.subscriptions TO service_role;


--
-- Name: TABLE test_drive_bookings; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.test_drive_bookings TO anon;
GRANT ALL ON TABLE public.test_drive_bookings TO authenticated;
GRANT ALL ON TABLE public.test_drive_bookings TO service_role;


--
-- Name: TABLE two_factor_auth; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.two_factor_auth TO anon;
GRANT ALL ON TABLE public.two_factor_auth TO authenticated;
GRANT ALL ON TABLE public.two_factor_auth TO service_role;


--
-- Name: TABLE typing_indicators; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.typing_indicators TO anon;
GRANT ALL ON TABLE public.typing_indicators TO authenticated;
GRANT ALL ON TABLE public.typing_indicators TO service_role;


--
-- Name: TABLE user_bans; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_bans TO anon;
GRANT ALL ON TABLE public.user_bans TO authenticated;
GRANT ALL ON TABLE public.user_bans TO service_role;


--
-- Name: TABLE user_preferences; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_preferences TO anon;
GRANT ALL ON TABLE public.user_preferences TO authenticated;
GRANT ALL ON TABLE public.user_preferences TO service_role;


--
-- Name: TABLE user_reports; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_reports TO anon;
GRANT ALL ON TABLE public.user_reports TO authenticated;
GRANT ALL ON TABLE public.user_reports TO service_role;


--
-- Name: TABLE user_sessions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_sessions TO anon;
GRANT ALL ON TABLE public.user_sessions TO authenticated;
GRANT ALL ON TABLE public.user_sessions TO service_role;


--
-- Name: TABLE user_verifications; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_verifications TO anon;
GRANT ALL ON TABLE public.user_verifications TO authenticated;
GRANT ALL ON TABLE public.user_verifications TO service_role;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;


--
-- Name: TABLE vehicle_inquiries; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.vehicle_inquiries TO anon;
GRANT ALL ON TABLE public.vehicle_inquiries TO authenticated;
GRANT ALL ON TABLE public.vehicle_inquiries TO service_role;


--
-- Name: TABLE vehicle_views; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.vehicle_views TO anon;
GRANT ALL ON TABLE public.vehicle_views TO authenticated;
GRANT ALL ON TABLE public.vehicle_views TO service_role;


--
-- Name: TABLE vehicles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.vehicles TO anon;
GRANT ALL ON TABLE public.vehicles TO authenticated;
GRANT ALL ON TABLE public.vehicles TO service_role;


--
-- Name: TABLE video_thumbnails; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.video_thumbnails TO anon;
GRANT ALL ON TABLE public.video_thumbnails TO authenticated;
GRANT ALL ON TABLE public.video_thumbnails TO service_role;


--
-- Name: TABLE vin_report_cache; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.vin_report_cache TO anon;
GRANT ALL ON TABLE public.vin_report_cache TO authenticated;
GRANT ALL ON TABLE public.vin_report_cache TO service_role;


--
-- Name: TABLE vin_report_purchases; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.vin_report_purchases TO anon;
GRANT ALL ON TABLE public.vin_report_purchases TO authenticated;
GRANT ALL ON TABLE public.vin_report_purchases TO service_role;


--
-- Name: TABLE vin_reports; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.vin_reports TO anon;
GRANT ALL ON TABLE public.vin_reports TO authenticated;
GRANT ALL ON TABLE public.vin_reports TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.buckets FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.buckets TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets_analytics TO service_role;
GRANT ALL ON TABLE storage.buckets_analytics TO authenticated;
GRANT ALL ON TABLE storage.buckets_analytics TO anon;


--
-- Name: TABLE buckets_vectors; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.buckets_vectors TO service_role;
GRANT SELECT ON TABLE storage.buckets_vectors TO authenticated;
GRANT SELECT ON TABLE storage.buckets_vectors TO anon;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.objects FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.objects TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- Name: TABLE prefixes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.prefixes TO service_role;
GRANT ALL ON TABLE storage.prefixes TO authenticated;
GRANT ALL ON TABLE storage.prefixes TO anon;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE vector_indexes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.vector_indexes TO service_role;
GRANT SELECT ON TABLE storage.vector_indexes TO authenticated;
GRANT SELECT ON TABLE storage.vector_indexes TO anon;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

\unrestrict E6uoXkNjrcc99r5nAfgnM1QSuJDx7O0xVbflwTn4ueNP1pSoUu8UPNSqAox60wE

