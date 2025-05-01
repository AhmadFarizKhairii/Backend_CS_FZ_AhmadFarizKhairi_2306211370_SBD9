--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.3

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: transaction_status; Type: TYPE; Schema: public; Owner: Ahmad_56
--

CREATE TYPE public.transaction_status AS ENUM (
    'pending',
    'paid'
);


ALTER TYPE public.transaction_status OWNER TO "Ahmad_56";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: items; Type: TABLE; Schema: public; Owner: Ahmad_56
--

CREATE TABLE public.items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    price integer NOT NULL,
    store_id uuid NOT NULL,
    image_url character varying(255),
    stock integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.items OWNER TO "Ahmad_56";

--
-- Name: stores; Type: TABLE; Schema: public; Owner: Ahmad_56
--

CREATE TABLE public.stores (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.stores OWNER TO "Ahmad_56";

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: Ahmad_56
--

CREATE TABLE public.transactions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    item_id uuid NOT NULL,
    quantity integer NOT NULL,
    total integer NOT NULL,
    status public.transaction_status DEFAULT 'pending'::public.transaction_status,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.transactions OWNER TO "Ahmad_56";

--
-- Name: users; Type: TABLE; Schema: public; Owner: Ahmad_56
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    balance integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO "Ahmad_56";

--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: Ahmad_56
--

COPY public.items (id, name, price, store_id, image_url, stock, created_at) FROM stdin;
fc744072-6f30-46c9-bf84-8841bf57a3a1	jaket updated	300000	81718c33-dce9-4cf5-9e0e-39eba4c086fd	\N	10	2025-03-16 10:53:50.328831
1408c398-0434-42aa-be28-f640b5c34df6	jaket	300000	81718c33-dce9-4cf5-9e0e-39eba4c086fd	\N	9	2025-03-16 13:27:49.072953
eb1964d5-c8e6-4615-83d6-6cc11a6d4879	jaket	300000	81718c33-dce9-4cf5-9e0e-39eba4c086fd	https://res.cloudinary.com/dv5ioxark/image/upload/v1744547642/items/hiqnsogxzyjav9spmyyh.jpg	10	2025-04-13 12:34:03.41449
09c73e31-a840-4d93-9af8-0b553f34ab37	jaket	300000	81718c33-dce9-4cf5-9e0e-39eba4c086fd	https://res.cloudinary.com/dv5ioxark/image/upload/v1744548195/items/wyiztp6ewjfnxwvwnlgn.jpg	10	2025-04-13 12:43:16.407518
792e5b75-36a4-48f6-9885-5c12bf0553a3	jaket	300000	81718c33-dce9-4cf5-9e0e-39eba4c086fd	https://res.cloudinary.com/dv5ioxark/image/upload/v1744548335/items/qppbayxbasb9ycudq5dh.jpg	10	2025-04-13 12:45:35.542129
bf72b222-bbbd-4cdb-88e4-3eda4ce88428	jaket	300000	81718c33-dce9-4cf5-9e0e-39eba4c086fd	https://res.cloudinary.com/dv5ioxark/image/upload/v1744548450/items/bds1zbznrte8slnlcanc.jpg	10	2025-04-13 12:47:31.388313
fdfc80d4-d915-4fab-a158-c1991f4fa768	jaket	300000	81718c33-dce9-4cf5-9e0e-39eba4c086fd	https://res.cloudinary.com/dv5ioxark/image/upload/v1744548530/items/mvkeeyqyg9wmifmlebgw.jpg	10	2025-04-13 12:48:51.183081
\.


--
-- Data for Name: stores; Type: TABLE DATA; Schema: public; Owner: Ahmad_56
--

COPY public.stores (id, name, address, created_at) FROM stdin;
81718c33-dce9-4cf5-9e0e-39eba4c086fd	UI Store Engineering	Kota tercinta Depok, FTUI	2025-03-12 05:10:49.321799
a830c303-626e-40d7-ba5e-50299589b423	UI Store Engineering	Kota tercinta Depok, FTUI	2025-03-12 08:00:13.823917
407c99a7-a8ac-4913-87b2-ac4a0c6ab6a8	UI Store Engineering	Kota tercinta Depok, FTUI	2025-03-12 08:01:11.374926
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: Ahmad_56
--

COPY public.transactions (id, user_id, item_id, quantity, total, status, created_at) FROM stdin;
5da3c1a8-b4ac-4123-8a82-007d34cd01c4	9588bc68-f0f8-4703-bfbf-d2dc2056c81c	fc744072-6f30-46c9-bf84-8841bf57a3a1	1	300000	pending	2025-04-13 13:12:55.553603
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: Ahmad_56
--

COPY public.users (id, name, email, password, balance, created_at) FROM stdin;
8a9e67c0-b642-48ab-826b-15de6bfcd582	Ahmad	farizrusmal@gmail.com	merdeka	0	2025-03-19 06:48:02.626843
355ebded-39c1-4ac7-9e04-f8fedaa5e181	netlab	netlab1@mail.com	$2b$10$cHuvji/dTI3AC/QVFXz4gehZGbx9KFpk.DaybjDMvNuOu4UTpQenK	\N	2025-03-19 14:08:11.395243
9588bc68-f0f8-4703-bfbf-d2dc2056c81c	William Iskandar Updated	netlabupdated@mail.com	$2b$10$rU56snBE4N4qoJW0QZhBD.Nlxc2yj2p4atpKvyceHiK9PeDJl0qjO	900000	2025-03-19 05:02:44.134906
\.


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: Ahmad_56
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: stores stores_pkey; Type: CONSTRAINT; Schema: public; Owner: Ahmad_56
--

ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: Ahmad_56
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: Ahmad_56
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: Ahmad_56
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: items items_store_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Ahmad_56
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.stores(id) ON DELETE CASCADE;


--
-- Name: transactions transactions_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Ahmad_56
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.items(id) ON DELETE CASCADE;


--
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Ahmad_56
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

