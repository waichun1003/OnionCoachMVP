--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10 (Homebrew)
-- Dumped by pg_dump version 15.10 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: campaign_tags; Type: TABLE; Schema: public; Owner: waichuncheng
--

CREATE TABLE public.campaign_tags (
    campaign_id integer NOT NULL,
    tag character varying(50) NOT NULL
);


ALTER TABLE public.campaign_tags OWNER TO waichuncheng;

--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: waichuncheng
--

CREATE TABLE public.campaigns (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    cover_image character varying(255),
    coach character varying(255) NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    max_participants integer NOT NULL,
    current_participants integer DEFAULT 0,
    duration character varying(50) NOT NULL,
    sessions integer NOT NULL,
    status character varying(50) DEFAULT 'upcoming'::character varying NOT NULL,
    campaign_goals text[] NOT NULL,
    target_audience text NOT NULL,
    budget character varying(50) NOT NULL,
    timeline character varying(50) NOT NULL,
    preferred_channels text[] NOT NULL,
    message_style character varying(255) NOT NULL,
    kpis text[] NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.campaigns OWNER TO waichuncheng;

--
-- Name: campaigns_id_seq; Type: SEQUENCE; Schema: public; Owner: waichuncheng
--

CREATE SEQUENCE public.campaigns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.campaigns_id_seq OWNER TO waichuncheng;

--
-- Name: campaigns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: waichuncheng
--

ALTER SEQUENCE public.campaigns_id_seq OWNED BY public.campaigns.id;


--
-- Name: coaches; Type: TABLE; Schema: public; Owner: waichuncheng
--

CREATE TABLE public.coaches (
    id integer NOT NULL,
    full_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    linkedin_url character varying(255),
    website character varying(255),
    expertise text[] NOT NULL,
    experience character varying(50) NOT NULL,
    languages text[] NOT NULL,
    timezone character varying(50) NOT NULL,
    availability character varying(50) NOT NULL,
    preferred_rate character varying(50) NOT NULL,
    certifications text[],
    bio text NOT NULL,
    status character varying(50) DEFAULT 'pending'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.coaches OWNER TO waichuncheng;

--
-- Name: coaches_id_seq; Type: SEQUENCE; Schema: public; Owner: waichuncheng
--

CREATE SEQUENCE public.coaches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coaches_id_seq OWNER TO waichuncheng;

--
-- Name: coaches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: waichuncheng
--

ALTER SEQUENCE public.coaches_id_seq OWNED BY public.coaches.id;


--
-- Name: waitlist; Type: TABLE; Schema: public; Owner: waichuncheng
--

CREATE TABLE public.waitlist (
    id integer NOT NULL,
    full_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    company character varying(255),
    role character varying(255) NOT NULL,
    pricing_tier character varying(50) NOT NULL,
    industry character varying(100),
    company_size character varying(50),
    experience_level character varying(50),
    coaching_goals text[],
    preferred_language character varying(50),
    location character varying(100),
    heard_from character varying(100),
    budget_range character varying(50),
    start_timeline character varying(50),
    interests text[],
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(50) DEFAULT 'pending'::character varying
);


ALTER TABLE public.waitlist OWNER TO waichuncheng;

--
-- Name: waitlist_id_seq; Type: SEQUENCE; Schema: public; Owner: waichuncheng
--

CREATE SEQUENCE public.waitlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.waitlist_id_seq OWNER TO waichuncheng;

--
-- Name: waitlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: waichuncheng
--

ALTER SEQUENCE public.waitlist_id_seq OWNED BY public.waitlist.id;


--
-- Name: campaigns id; Type: DEFAULT; Schema: public; Owner: waichuncheng
--

ALTER TABLE ONLY public.campaigns ALTER COLUMN id SET DEFAULT nextval('public.campaigns_id_seq'::regclass);


--
-- Name: coaches id; Type: DEFAULT; Schema: public; Owner: waichuncheng
--

ALTER TABLE ONLY public.coaches ALTER COLUMN id SET DEFAULT nextval('public.coaches_id_seq'::regclass);


--
-- Name: waitlist id; Type: DEFAULT; Schema: public; Owner: waichuncheng
--

ALTER TABLE ONLY public.waitlist ALTER COLUMN id SET DEFAULT nextval('public.waitlist_id_seq'::regclass);


--
-- Data for Name: campaign_tags; Type: TABLE DATA; Schema: public; Owner: waichuncheng
--

COPY public.campaign_tags (campaign_id, tag) FROM stdin;
1	Leadership
1	Management
1	Development
2	Leadership
2	Management
2	Development
3	Leadership
3	Management
3	Development
4	Leadership
4	Management
4	Development
5	Leadership
5	Management
5	Development
3	Digital
3	Marketing
3	Innovation
4	Agile
4	Project Management
4	Methodology
8	Digital
8	Strategy
8	Transformation
9	Leadership
9	Teams
9	Performance
11	Culture
11	Innovation
11	Communication
\.


--
-- Data for Name: campaigns; Type: TABLE DATA; Schema: public; Owner: waichuncheng
--

COPY public.campaigns (id, title, description, cover_image, coach, start_date, end_date, max_participants, current_participants, duration, sessions, status, campaign_goals, target_audience, budget, timeline, preferred_channels, message_style, kpis, created_at, updated_at) FROM stdin;
1	Leadership Mastery 2024	Transform your leadership skills with our comprehensive program.	https://images.unsplash.com/photo-1517245386807-bb43f82c33c4	Sarah Johnson	2024-03-15 00:00:00	2024-04-15 00:00:00	50	35	4 weeks	8	active	{"Develop leadership skills","Build confidence","Improve team management"}	Mid-level managers and aspiring leaders	$2000-$3000	March-April 2024	{Workshops,"One-on-one coaching","Group sessions"}	Professional and engaging	{"Leadership assessment scores","Participant satisfaction","Team performance metrics"}	2025-01-16 14:13:32.294526	\N
2	Leadership Mastery 2024	Transform your leadership skills with our comprehensive program.	https://images.unsplash.com/photo-1517245386807-bb43f82c33c4	Sarah Johnson	2024-03-15 00:00:00	2024-04-15 00:00:00	50	35	4 weeks	8	active	{"Develop leadership skills","Build confidence","Improve team management"}	Mid-level managers and aspiring leaders	$2000-$3000	March-April 2024	{Workshops,"One-on-one coaching","Group sessions"}	Professional and engaging	{"Leadership assessment scores","Participant satisfaction","Team performance metrics"}	2025-01-16 14:14:39.059045	\N
3	Digital Marketing Innovation	Master cutting-edge digital marketing strategies.	https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a	Michael Chen	2024-03-20 00:00:00	2024-04-20 00:00:00	75	45	4 weeks	12	active	{"Digital marketing mastery","ROI optimization","Social media strategy"}	Marketing professionals and business owners	$1500-$2500	March-April 2024	{"Online workshops","Case studies","Live Q&A"}	Dynamic and practical	{"Campaign ROI","Engagement rates","Conversion metrics"}	2025-01-16 14:14:39.059045	\N
4	Agile Project Management	Master agile methodologies and transform project delivery.	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40	David Miller	2024-03-25 00:00:00	2024-04-25 00:00:00	60	40	4 weeks	10	active	{"Agile certification prep","Scrum mastery","Project efficiency"}	Project managers and team leaders	$2500-$3500	March-April 2024	{"Interactive sessions","Practice exercises","Team simulations"}	Structured and methodical	{"Project completion rates","Team velocity","Stakeholder satisfaction"}	2025-01-16 14:14:39.059045	\N
5	Data Analytics Mastery	Unlock the power of data-driven decision making.	https://images.unsplash.com/photo-1551288049-bebda4e38f71	Emma Watson	2024-03-30 00:00:00	2024-04-30 00:00:00	40	28	4 weeks	8	active	{"Data analysis skills","Statistical modeling","Data visualization"}	Analysts and business professionals	$2000-$3000	March-April 2024	{"Hands-on workshops","Real-world projects","Expert guidance"}	Technical and practical	{"Analysis accuracy","Project completion","Skill assessment scores"}	2025-01-16 14:14:39.059045	\N
6	Content Creation Masterclass	Create compelling content that engages and converts.	https://images.unsplash.com/photo-1552664730-d307ca884978	Nina Patel	2024-05-15 00:00:00	2024-06-15 00:00:00	60	0	4 weeks	10	upcoming	{"Content strategy",Storytelling,"Brand voice"}	Content creators and marketers	$1800-$2800	May-June 2024	{Workshops,"Writing sessions","Peer review"}	Creative and engaging	{"Content quality","Audience engagement","Brand consistency"}	2025-01-16 14:14:39.059045	\N
7	AI for Business Innovation	Harness AI technology for business growth.	https://images.unsplash.com/photo-1485827404703-89b55fcc595e	Alex Turner	2024-06-15 00:00:00	2024-07-15 00:00:00	40	0	4 weeks	12	upcoming	{"AI fundamentals","Implementation strategies","Future trends"}	Business leaders and innovators	$3000-$4000	June-July 2024	{"Tech workshops","AI demos","Strategy sessions"}	Technical and forward-thinking	{"Innovation index","Implementation success","ROI metrics"}	2025-01-16 14:14:39.059045	\N
8	Digital Transformation Strategy	Lead your organization through successful digital transformation.	https://images.unsplash.com/photo-1451187580459-43490279c0fa	Robert Chen	2024-07-01 00:00:00	2024-08-01 00:00:00	45	0	4 weeks	10	upcoming	{"Digital strategy","Change management","Technology adoption"}	Business leaders and IT executives	$2500-$3500	July-August 2024	{"Virtual workshops","Strategy sessions","Implementation planning"}	Strategic and practical	{"Digital maturity score","Adoption rates","ROI metrics"}	2025-01-16 14:30:52.401448	\N
9	High-Performance Team Building	Build and lead high-performing teams in the modern workplace.	https://images.unsplash.com/photo-1522071820081-009f0129c71c	Sarah Martinez	2024-07-15 00:00:00	2024-08-15 00:00:00	40	0	4 weeks	8	upcoming	{"Team dynamics","Performance optimization","Leadership skills"}	Team leaders and managers	$2000-$3000	July-August 2024	{"Team exercises","Case studies","Coaching sessions"}	Interactive and engaging	{"Team performance","Employee satisfaction","Project success rates"}	2025-01-16 14:30:52.401448	\N
11	diana meditation campaign	Transform your mind and achieve your wildest dreams with the Silva Ultramind System and Mindvalley's library of programs. Become a Mindvalley Member today.	https://res.cloudinary.com/ddy6grizj/image/upload/v1737042365/campaign-covers/wtgn5shtsmmwykjcwmqe.jpeg	Diana Chan	2025-01-16 08:00:00	2025-01-23 08:00:00	50	0	2 weeks	6	upcoming	{"Team Building","Career Growth","Innovation & Creativity"}	mid level managers and executive	100000	2 weeks	{"Group Workshops","Hybrid Learning","Online Courses"}	Interactive & Dynamic	{"Implementation Success","ROI Measurement","Behavioral Changes","Skill Assessment Scores","Performance Metrics","Learning Outcomes","Participant Satisfaction"}	2025-01-16 23:48:56.005455	2025-01-16 23:48:56.005455
\.


--
-- Data for Name: coaches; Type: TABLE DATA; Schema: public; Owner: waichuncheng
--

COPY public.coaches (id, full_name, email, linkedin_url, website, expertise, experience, languages, timezone, availability, preferred_rate, certifications, bio, status, created_at, updated_at) FROM stdin;
1	asdfasdf	asdfasd@gmail.com	https://www.linkedin.com/in/samuel-cheng-4a1270a9/	https://www.linkedin.com/in/samuel-cheng-4a1270a9/	{"Career Development","Life Coaching",Communication}	3-5 years	{English,Japanese}	UTC+8 (SGT/CST)	Weekends only	$100-200/hour	{"ICF ACC","NLP Practitioner"}	aefasdfgsdf asdvgasd \nalkjdfgaljksdfhasjkh ajklsdghjklasdjhfksadhjfioasdjoigfah\nalsjdflaksjdhfjsdhfajksdghalkjsdhfkjasdhfkjlasdh	pending	2025-01-15 16:32:31.761522	\N
\.


--
-- Data for Name: waitlist; Type: TABLE DATA; Schema: public; Owner: waichuncheng
--

COPY public.waitlist (id, full_name, email, company, role, pricing_tier, industry, company_size, experience_level, coaching_goals, preferred_language, location, heard_from, budget_range, start_timeline, interests, created_at, status) FROM stdin;
1	Test User	test@example.com	Test Co	Developer	Professional Growth	Technology	1-10	Mid Level	{"Career Advancement","Leadership Development"}	English	New York	Social Media	100-200	1-3 months	{"Career Development","Leadership Skills"}	2025-01-14 22:29:03.925178+08	pending
3	Cheng Wai Chun	waichun1003@gmail.com	OKX	Senior QA	Professional Growth	Technology	1000+	Mid Level	{"Career Advancement","Leadership Development","Team Management"}	Chinese	Hong Kong	\N	$500+/month	Immediately	{}	2025-01-14 22:53:02.926466+08	pending
5	cheng wai chun	samuelcheng@gmail.com	okx	ajshd	Professional Growth	Technology	1-10	Entry Level	{"Leadership Development","Personal Development","Work-Life Balance","Strategic Planning","Communication Skills"}	klasjdf	kjahsjdha	\N	$500+/month	6+ months	{}	2025-01-14 23:01:17.543074+08	pending
\.


--
-- Name: campaigns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: waichuncheng
--

SELECT pg_catalog.setval('public.campaigns_id_seq', 11, true);


--
-- Name: coaches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: waichuncheng
--

SELECT pg_catalog.setval('public.coaches_id_seq', 1, true);


--
-- Name: waitlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: waichuncheng
--

SELECT pg_catalog.setval('public.waitlist_id_seq', 5, true);


--
-- Name: campaign_tags campaign_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: waichuncheng
--

ALTER TABLE ONLY public.campaign_tags
    ADD CONSTRAINT campaign_tags_pkey PRIMARY KEY (campaign_id, tag);


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: waichuncheng
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (id);


--
-- Name: coaches coaches_email_key; Type: CONSTRAINT; Schema: public; Owner: waichuncheng
--

ALTER TABLE ONLY public.coaches
    ADD CONSTRAINT coaches_email_key UNIQUE (email);


--
-- Name: coaches coaches_pkey; Type: CONSTRAINT; Schema: public; Owner: waichuncheng
--

ALTER TABLE ONLY public.coaches
    ADD CONSTRAINT coaches_pkey PRIMARY KEY (id);


--
-- Name: waitlist waitlist_email_key; Type: CONSTRAINT; Schema: public; Owner: waichuncheng
--

ALTER TABLE ONLY public.waitlist
    ADD CONSTRAINT waitlist_email_key UNIQUE (email);


--
-- Name: waitlist waitlist_pkey; Type: CONSTRAINT; Schema: public; Owner: waichuncheng
--

ALTER TABLE ONLY public.waitlist
    ADD CONSTRAINT waitlist_pkey PRIMARY KEY (id);


--
-- Name: idx_coaches_email; Type: INDEX; Schema: public; Owner: waichuncheng
--

CREATE INDEX idx_coaches_email ON public.coaches USING btree (email);


--
-- Name: idx_coaches_status; Type: INDEX; Schema: public; Owner: waichuncheng
--

CREATE INDEX idx_coaches_status ON public.coaches USING btree (status);


--
-- Name: campaign_tags campaign_tags_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: waichuncheng
--

ALTER TABLE ONLY public.campaign_tags
    ADD CONSTRAINT campaign_tags_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

