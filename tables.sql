CREATE TABLE public.chargepoint (
    id bigint NOT NULL,
    name character varying(32),
    status text,
    created_at bigint,
    deleted_at bigint,
    CONSTRAINT check_status CHECK ((status = ANY (ARRAY['ready'::text, 'charging'::text, 'waiting'::text, 'error'::text])))
);

ALTER TABLE public.chargepoint ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.chargepoint_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);