CREATE TABLE cd_usersdojos (
    id character varying NOT NULL,
    mysql_user_id integer,
    mysql_dojo_id integer,
    owner smallint,
    user_id character varying,
    dojo_id character varying,
    user_types character varying[],
    user_permissions json[],
    background_checked boolean DEFAULT false,
    deleted smallint DEFAULT 0 NOT NULL,
    deleted_by character varying,
    deleted_at timestamp with time zone,
    CONSTRAINT pk_cd_userdojos PRIMARY KEY (id)
);
