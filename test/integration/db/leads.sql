
CREATE TABLE public.cd_dojoleads (
  user_id character varying,
  email character varying,
  application json,
  id character varying NOT NULL,
  completed boolean,
  deleted smallint DEFAULT 0 NOT NULL,
  deleted_by character varying,
  deleted_at timestamp with time zone,
  completed_at timestamp without time zone,
  created_at timestamp without time zone,
  updated_at timestamp without time zone,
  CONSTRAINT pk_cd_dojoleads PRIMARY KEY (id)
);

