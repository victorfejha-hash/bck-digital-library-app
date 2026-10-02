-- BCK Digital Library application schema

create table if not exists profiles (
  user_id text primary key,
  name text not null default '',
  email text,
  phone text not null default '',
  school text not null default 'Bishop Cipriano Kihangire Secondary School',
  points integer not null default 0,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists profiles_points_idx on profiles (points desc);

create table if not exists saved_resources (
  user_id text not null,
  resource_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, resource_id)
);

create table if not exists exam_attempts (
  id serial primary key,
  user_id text not null,
  exam_id text not null,
  score integer not null,
  max_score integer not null,
  points_awarded integer not null,
  created_at timestamptz not null default now()
);
create index if not exists exam_attempts_user_id_idx on exam_attempts (user_id);

create table if not exists notifications (
  id serial primary key,
  title text not null,
  body text not null,
  created_by text not null,
  created_at timestamptz not null default now()
);

create table if not exists notification_reads (
  user_id text not null,
  notification_id integer not null,
  read_at timestamptz not null default now(),
  primary key (user_id, notification_id)
);

create table if not exists feedback (
  id serial primary key,
  user_id text not null,
  name text not null,
  email text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists videos (
  id serial primary key,
  title text not null,
  youtube_id text not null,
  channel text not null default 'BCK Library',
  topic text not null default 'General',
  created_by text not null,
  created_at timestamptz not null default now()
);

create table if not exists course_bookings (
  id serial primary key,
  user_id text not null,
  course_id text not null,
  course_name text not null,
  status text not null default 'reserved',
  created_at timestamptz not null default now()
);
create index if not exists course_bookings_user_id_idx on course_bookings (user_id);

create table if not exists discussion_posts (
  id serial primary key,
  user_id text not null,
  display_name text not null,
  class_level text not null default '',
  contact text not null default '',
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists ranking_seeds (
  id text primary key,
  name text not null,
  school text not null default 'BCK',
  points integer not null default 0,
  exams integer not null default 0
);

insert into ranking_seeds (id, name, school, points, exams) values
  ('seed-01', 'Aisha N.', 'BCK', 240, 8),
  ('seed-02', 'Daniel K.', 'BCK', 210, 7),
  ('seed-03', 'Mercy A.', 'BCK', 180, 6),
  ('seed-04', 'Joel M.', 'BCK', 160, 6),
  ('seed-05', 'Faith N.', 'St. Mary''s Kitende', 150, 5),
  ('seed-06', 'Brian O.', 'BCK', 140, 5),
  ('seed-07', 'Sandra T.', 'Namilyango College', 120, 4),
  ('seed-08', 'Peter W.', 'BCK', 90, 3)
on conflict (id) do nothing;

insert into notifications (title, body, created_by)
select
  'Welcome to BCK Digital Library',
  'Browse authorised study PDFs, sit practice exams, book holiday courses, and ask the AI Study Coach. Developed by VYRNOX / VICt-n3r / MATAA.',
  'system'
where not exists (select 1 from notifications);
